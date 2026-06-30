import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { createAnimatable } from 'animejs';
import type { AnimatableObject } from 'animejs';

/**
 * Desplaza el elemento de forma proporcional a la posición del cursor
 * dentro de su contenedor de referencia (el hero). Factor configurable.
 * Solo en desktop / pointer fino y sin prefers-reduced-motion.
 *
 * Usa `createAnimatable` de anime.js v4: el suavizado lo gestiona el propio
 * motor (sin requestAnimationFrame manual) y cada cambio de posición se
 * interpola con easing.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** Intensidad del desplazamiento en px por unidad normalizada (-1..1). */
  @Input('appParallax') factor = 12;

  private animatable?: AnimatableObject;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.animatable = createAnimatable(this.host.nativeElement, {
      translateX: { duration: 800, ease: 'outExpo' },
      translateY: { duration: 800, ease: 'outExpo' },
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!this.canRun() || !this.animatable) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    this.animatable['translateX'](nx * this.factor);
    this.animatable['translateY'](ny * this.factor);
  }

  ngOnDestroy(): void {
    this.animatable?.revert();
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
