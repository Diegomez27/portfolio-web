import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';

/**
 * Desplaza el elemento de forma proporcional a la posición del cursor
 * dentro de su contenedor de referencia (el hero). Factor configurable.
 * Solo en desktop / pointer fino y sin prefers-reduced-motion.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** Intensidad del desplazamiento en px por unidad normalizada (-1..1). */
  @Input('appParallax') factor = 12;

  private raf = 0;

  @HostListener('window:mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!this.canRun()) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        this.host.nativeElement.style.transform =
          `translate(${nx * this.factor}px, ${ny * this.factor}px)`;
      });
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
