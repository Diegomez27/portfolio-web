import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { animate, stagger, onScroll } from 'animejs';
import type { JSAnimation, ScrollObserver } from 'animejs';

/**
 * Entrada escalonada de los hijos directos cuando el contenedor entra en viewport.
 * Usa `animate` + `onScroll` de anime.js v4: la animación se vincula a un observer
 * de scroll y se reproduce al cruzar el umbral. El contenido queda visible si JS no
 * puede correr o el usuario pidió reduced-motion (evita FOUC / contenido invisible).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** ms de retraso entre hijos consecutivos. */
  @Input('appReveal') step: number | '' = 80;

  private anim?: JSAnimation;
  private observer?: ScrollObserver;

  ngOnInit(): void {
    if (this.reduce()) return;

    const el = this.host.nativeElement;
    const step = typeof this.step === 'number' ? this.step : 80;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    // El scroll real ocurre dentro de un contenedor propio (<main class="scroller">),
    // no en window. Hay que indicárselo a onScroll o nunca dispara el enter.
    const container = this.scrollParent(el);

    this.observer = onScroll({
      container,
      target: el,
      // Sintaxis anime.js: '<posición en viewport> <posición en el elemento>'.
      // '85% top' = dispara cuando el BORDE SUPERIOR del elemento entra al 85% de
      // la pantalla. Con '85%' fijo al elemento, las secciones altas (contacto en
      // móvil) entraban tarde y pedían scrollear casi toda la sección.
      enter: '85% top',
    });

    this.anim = animate(children, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 600,
      ease: 'outExpo',
      delay: stagger(step),
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

  private reduce(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
