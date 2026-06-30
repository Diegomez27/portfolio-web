import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { animate, createAnimatable, createDrawable } from 'animejs';
import type { AnimatableObject } from 'animejs';

type ServiceIcon = 'systems' | 'realtime' | 'web';

interface Service {
  num: string;
  icon: ServiceIcon;
  titleKey: string;
  descKey: string;
  tags: string[];
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RevealDirective, TiltDirective, TranslatePipe],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
})
export class ServicesSectionComponent implements AfterViewInit, OnDestroy {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  readonly services: Service[] = [
    {
      num: '01',
      icon: 'systems',
      titleKey: 'services.s1.title',
      descKey: 'services.s1.desc',
      tags: ['CRM', 'Dashboard', 'Roles & Auth'],
    },
    {
      num: '02',
      icon: 'realtime',
      titleKey: 'services.s2.title',
      descKey: 'services.s2.desc',
      tags: ['POS', 'WebSockets', 'Tiempo real'],
    },
    {
      num: '03',
      icon: 'web',
      titleKey: 'services.s3.title',
      descKey: 'services.s3.desc',
      tags: ['Mobile-first', 'Diseño propio', 'Entrega rápida'],
    },
  ];

  /** Recursos de anime.js que hay que revertir al destruir. */
  private readonly animatables: AnimatableObject[] = [];
  private readonly cleanups: Array<() => void> = [];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || this.reduce()) return;

    const cards = this.host.nativeElement.querySelectorAll<HTMLElement>('.card');
    cards.forEach((card: HTMLElement) => this.wireCard(card));
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((off) => off());
    this.animatables.forEach((a) => a.revert());
  }

  /** Conecta las micro-animaciones de hover de una tarjeta. */
  private wireCard(card: HTMLElement): void {
    // El ícono "salta" suavemente al entrar — Animatable reutilizable (no crea
    // una animación nueva en cada mouseover).
    const iconEl = card.querySelector<HTMLElement>('.card__icon');
    if (iconEl) {
      const pop = createAnimatable(iconEl, {
        scale: { duration: 450, ease: 'outBack' },
      });
      this.animatables.push(pop);
      this.on(card, 'mouseenter', () => pop['scale'](1.12));
      this.on(card, 'mouseleave', () => pop['scale'](1));
    }

    // ECG de "tiempo real": se redibuja de 0% a 100% con createDrawable.
    const ecg = card.querySelector<SVGPathElement>('.icon-realtime path');
    if (ecg) {
      this.wireDrawable(card, ecg, 900, 'outQuad');
    }

    // Globo de "presencia web": el círculo se traza con createDrawable.
    const globe = card.querySelector<SVGCircleElement>('.icon-web circle');
    if (globe) {
      this.wireDrawable(card, globe, 1000, 'inOutSine');
    }
  }

  /**
   * Crea un drawable que en reposo se ve completo (0 1) y, en cada hover, lo
   * vuelve a trazar de 0 a 100%. anime.js reemplaza el tween anterior sobre el
   * mismo elemento (composición 'replace' por defecto), así que no se acumulan.
   */
  private wireDrawable(
    card: HTMLElement,
    el: SVGGeometryElement,
    duration: number,
    ease: string,
  ): void {
    const [drawable] = createDrawable(el, 0, 1);
    this.on(card, 'mouseenter', () => {
      animate(drawable, { draw: ['0 0', '0 1'], duration, ease });
    });
  }

  /** Registra un listener y guarda su limpieza. */
  private on(
    el: HTMLElement,
    type: 'mouseenter' | 'mouseleave',
    handler: () => void,
  ): void {
    el.addEventListener(type, handler);
    this.cleanups.push(() => el.removeEventListener(type, handler));
  }

  private reduce(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
