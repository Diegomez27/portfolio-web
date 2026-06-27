import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Entrada escalonada de los hijos directos cuando el contenedor entra en viewport.
 * El contenido queda visible por defecto; la animación solo se aplica si JS puede
 * correr y el usuario no pidió reduced-motion (evita FOUC / contenido invisible).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** ms de retraso entre hijos consecutivos. */
  @Input('appReveal') step: number | '' = 80;

  private io?: IntersectionObserver;

  ngOnInit(): void {
    if (this.reduce()) return;

    const el = this.host.nativeElement;
    const step = typeof this.step === 'number' ? this.step : 80;

    Array.from(el.children).forEach((child, i) => {
      (child as HTMLElement).style.transitionDelay = `${i * step}ms`;
    });

    el.classList.add('reveal');

    this.io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('reveal-in');
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    this.io.observe(el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private reduce(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
