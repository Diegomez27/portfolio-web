import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';

/**
 * Tilt 3D sutil siguiendo al cursor. Solo desktop / pointer fino, sin reduced-motion.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** Inclinación máxima en grados. */
  @Input() tiltMax = 7;

  private raf = 0;

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!this.canRun()) return;
    const el = this.host.nativeElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        el.style.transform =
          `perspective(700px) rotateX(${-py * this.tiltMax}deg) ` +
          `rotateY(${px * this.tiltMax}deg) translateY(-3px)`;
      });
    }
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
