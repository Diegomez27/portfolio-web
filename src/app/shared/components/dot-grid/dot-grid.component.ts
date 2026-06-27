import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

interface RGB { r: number; g: number; b: number; }

/**
 * Rejilla de puntos en canvas que reacciona al cursor: los puntos cercanos
 * crecen, se tiñen del acento y se apartan ligeramente. Lee los colores de los
 * tokens CSS (se adapta al tema). Fallback estático con prefers-reduced-motion.
 */
@Component({
  selector: 'app-dot-grid',
  standalone: true,
  template: `<canvas #cv class="dg"></canvas>`,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .dg { display: block; width: 100%; height: 100%; }
  `],
})
export class DotGridComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cv', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private ro?: ResizeObserver;
  private raf = 0;
  private frame = 0;

  private w = 0;
  private h = 0;
  private dpr = 1;

  private readonly gap = 26;       // separación entre puntos (px)
  private readonly base = 1.3;     // radio base
  private readonly grow = 2.4;     // crecimiento máx cerca del cursor
  private readonly radius = 130;   // alcance de influencia
  private readonly push = 6;       // desplazamiento máx

  private mouseX = -9999;
  private mouseY = -9999;
  private rect = { left: 0, top: 0 };

  private ink: RGB = { r: 20, g: 19, b: 15 };
  private accent: RGB = { r: 225, g: 67, b: 42 };

  private readonly onMove = (e: MouseEvent) => {
    this.mouseX = e.clientX - this.rect.left;
    this.mouseY = e.clientY - this.rect.top;
  };

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    this.readColors();
    this.resize();

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);

    if (this.reduce()) {
      this.draw();           // un solo frame estático
      return;
    }

    window.addEventListener('mousemove', this.onMove, { passive: true });
    this.loop();
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMove);
    this.ro?.disconnect();
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  private loop = (): void => {
    // refresca colores cada ~20 frames (por si cambia el tema/acento)
    if (this.frame++ % 20 === 0) this.readColors();
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private draw(): void {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    for (let x = this.gap / 2; x < w; x += this.gap) {
      for (let y = this.gap / 2; y < h; y += this.gap) {
        const dx = x - this.mouseX;
        const dy = y - this.mouseY;
        const dist = Math.hypot(dx, dy);
        const inf = dist < this.radius ? 1 - dist / this.radius : 0;

        const r = this.base + inf * this.grow;
        const ox = inf > 0 ? (dx / (dist || 1)) * inf * this.push : 0;
        const oy = inf > 0 ? (dy / (dist || 1)) * inf * this.push : 0;

        const cr = this.lerp(this.ink.r, this.accent.r, inf);
        const cg = this.lerp(this.ink.g, this.accent.g, inf);
        const cb = this.lerp(this.ink.b, this.accent.b, inf);
        const alpha = 0.14 + inf * 0.66;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const r = canvas.getBoundingClientRect();
    this.rect = { left: r.left, top: r.top };
    this.w = r.width;
    this.h = r.height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(this.w * this.dpr);
    canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.reduce()) this.draw();
  }

  private readColors(): void {
    if (typeof getComputedStyle === 'undefined') return;
    // Usamos el elemento canvas como sonda: el navegador resuelve los tokens
    // (incluido color-mix) a rgb() al leer la propiedad `color` computada.
    const el = this.canvasRef.nativeElement;
    el.style.color = 'var(--accent-text)';
    this.accent = this.parse(getComputedStyle(el).color, this.accent);
    el.style.color = 'var(--ink)';
    this.ink = this.parse(getComputedStyle(el).color, this.ink);
  }

  private parse(color: string, fallback: RGB): RGB {
    const m = color.match(/[\d.]+/g);
    if (!m || m.length < 3) return fallback;
    let [r, g, b] = [+m[0], +m[1], +m[2]];
    // `color(srgb x y z)` da canales en 0–1; `rgb()` ya viene en 0–255
    if (/^color\(/i.test(color.trim())) { r *= 255; g *= 255; b *= 255; }
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  }

  private lerp(a: number, b: number, t: number): number {
    return Math.round(a + (b - a) * t);
  }

  private reduce(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
