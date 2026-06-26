import {
  Directive,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';

/**
 * Botón magnético: se desplaza hacia el cursor mientras está encima,
 * y vuelve a su posición al salir. Solo desktop / pointer fino.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  private readonly host = inject(ElementRef<HTMLElement>);

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!this.canRun()) return;
    const el = this.host.nativeElement;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.4}px)`;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.host.nativeElement.style.transform = '';
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
