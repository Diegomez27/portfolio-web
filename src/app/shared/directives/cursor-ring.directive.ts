import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

/**
 * Anillo custom que sigue al cursor (solo desktop / pointer fino).
 * Se desactiva en pantallas táctiles y con prefers-reduced-motion.
 */
@Directive({
  selector: '[appCursorRing]',
  standalone: true,
})
export class CursorRingDirective implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly r = inject(Renderer2);

  private ring?: HTMLElement;
  private raf = 0;
  private x = 0;
  private y = 0;
  private readonly onMove = (e: MouseEvent) => {
    this.x = e.clientX;
    this.y = e.clientY;
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => this.render());
    }
  };

  ngOnInit(): void {
    if (!this.canRun()) return;

    const ring = this.r.createElement('div') as HTMLElement;
    this.r.setStyle(ring, 'position', 'fixed');
    this.r.setStyle(ring, 'top', '0');
    this.r.setStyle(ring, 'left', '0');
    this.r.setStyle(ring, 'width', '30px');
    this.r.setStyle(ring, 'height', '30px');
    this.r.setStyle(ring, 'border', '1.5px solid var(--accent)');
    this.r.setStyle(ring, 'border-radius', '50%');
    this.r.setStyle(ring, 'pointer-events', 'none');
    this.r.setStyle(ring, 'z-index', '9999');
    this.r.setStyle(ring, 'mix-blend-mode', 'multiply');
    this.r.setStyle(ring, 'transform', 'translate(-100px, -100px)');
    this.r.setStyle(ring, 'transition', 'transform .14s ease-out');
    this.r.appendChild(document.body, ring);
    this.ring = ring;

    window.addEventListener('mousemove', this.onMove, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMove);
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.ring) this.r.removeChild(document.body, this.ring);
  }

  private render(): void {
    this.raf = 0;
    if (this.ring) {
      this.ring.style.transform = `translate(${this.x - 15}px, ${this.y - 15}px)`;
    }
  }

  private canRun(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      window.matchMedia('(min-width: 1100px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
