import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { animate, onScroll } from 'animejs';
import type { JSAnimation, ScrollObserver } from 'animejs';

/**
 * Parallax vinculado al scroll para pantallas táctiles: el elemento se desplaza
 * verticalmente (+factor → -factor px) según su progreso por el viewport.
 * Es el sustituto en móvil/tablet del parallax de cursor de `appParallax`,
 * que solo corre en desktop con pointer fino — por eso esta directiva se
 * limita a <1100px, y así ambas nunca pelean por el mismo transform.
 *
 * Usa `onScroll` de anime.js v4 con `sync` numérico: el progreso sigue al
 * scroll con una leve inercia (suavizado gestionado por el motor, fuera de
 * la change detection de Angular).
 */
@Directive({
  selector: '[appScrollParallax]',
  standalone: true,
})
export class ScrollParallaxDirective implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** Desplazamiento máximo en px: el elemento viaja de +factor a -factor. */
  @Input('appScrollParallax') factor: number | '' = 12;

  private anim?: JSAnimation;
  private observer?: ScrollObserver;

  ngOnInit(): void {
    if (!this.canRun()) return;

    const el = this.host.nativeElement;
    const factor = typeof this.factor === 'number' ? this.factor : 12;

    // El scroll real ocurre en <main class="scroller">, no en window (ver appReveal).
    this.observer = onScroll({
      container: this.scrollParent(el),
      target: el,
      // Progreso 0→1 durante todo el cruce del viewport:
      // enter cuando el borde superior toca el fondo de la pantalla,
      // leave cuando el borde inferior sale por arriba.
      enter: 'bottom top',
      leave: 'top bottom',
      sync: 0.3,
    });

    this.anim = animate(el, {
      translateY: [factor, -factor],
      ease: 'linear',
      autoplay: this.observer,
    });
  }

  ngOnDestroy(): void {
    this.anim?.revert();
    this.observer?.revert();
  }

  /** Busca el ancestro scrolleable más cercano (el contenedor de onScroll). */
  private scrollParent(el: HTMLElement): HTMLElement | undefined {
    let node = el.parentElement;
    while (node) {
      const oy = getComputedStyle(node).overflowY;
      if (
        (oy === 'auto' || oy === 'scroll') &&
        node.scrollHeight > node.clientHeight
      ) {
        return node;
      }
      node = node.parentElement;
    }
    return undefined;
  }

  private canRun(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 1099px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
