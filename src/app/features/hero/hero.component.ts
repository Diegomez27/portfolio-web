import {
  AfterViewInit,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChapterService } from '../../core/services/chapter.service';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { DotGridComponent } from '../../shared/components/dot-grid/dot-grid.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { animate, createTimeline, stagger, scrambleText, utils, text } from 'animejs';

/** Todos los elementos que entran con la animación de intro del hero. */
const INTRO_TARGETS =
  '.hero__overline, .hero__title, .hero__sub, .hero__ctas .btn, ' +
  '.diagram__label, .diagram__stack .tier, .diagram__tech .tech, ' +
  '.diagram__chip, .diagram__deco svg';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParallaxDirective, MagneticDirective, DotGridComponent, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  readonly nav = inject(ChapterService);

  /** Activa la animación de reveal solo cuando JS confirma que puede correr. */
  readonly ready = signal(false);

  readonly stack = [
    { name: 'Angular', logo: 'logos/angular.svg' },
    { name: 'NestJS', logo: 'logos/nestjs.svg' },
    { name: 'TypeScript', logo: 'logos/typescript.svg' },
    { name: 'PostgreSQL', logo: 'logos/postgresql.svg' },
    { name: 'Docker', logo: 'logos/docker.svg' },
  ];

  readonly tiers = [
    { name: 'Frontend', tech: 'Angular · Signals' },
    { name: 'Backend', tech: 'NestJS · REST + WS' },
    { name: 'Data', tech: 'PostgreSQL · RLS' },
  ];

  readonly chips = ['auth', 'billing', 'multi-tenant', 'api', 'realtime'];

  ngAfterViewInit(): void {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      // Fija opacity:0 inline de inmediato (síncrono). Así, al activar `.ready`
      // y quitar el ocultamiento por CSS, los elementos siguen invisibles hasta
      // que la animación los trae — el estilo inline gana al CSS por especificidad.
      utils.set(INTRO_TARGETS, { opacity: 0 });
      this.ready.set(true);
      requestAnimationFrame(() => this.runAnimeIntro());
    } else {
      this.ready.set(true);
    }
  }

  private runAnimeIntro(): void {
    // Separa el título en letras (agrupadas por palabra para no romper el wrap)
    // conservando el <em> de acento. Cada letra entrará girando en 3D.
    let titleChars: HTMLElement[] = [];
    const titleEl = document.querySelector<HTMLElement>('.hero__title');
    if (titleEl) {
      const splitted = text.splitText(titleEl, { words: true, chars: true });
      titleChars = splitted.chars as HTMLElement[];
      // Las letras arrancan giradas e invisibles; el contenedor ya puede mostrarse.
      utils.set(titleChars, { opacity: 0, rotateY: -90 });
      utils.set(titleEl, { opacity: 1 });
    }

    // Posiciones ABSOLUTAS (ms) para que la columna izquierda y el diagrama de la
    // derecha entren EN PARALELO — el intro se siente rápido y no "por partes".
    const tl = createTimeline();

    // ── Columna izquierda ──
    // Overline mono: efecto "scramble" tipo hacker que revela el texto traducido.
    tl.add('.hero__overline', {
      opacity: [0, 1],
      duration: 600,
      ease: 'outExpo',
      innerHTML: scrambleText({ chars: 'uppercase' }),
    }, 0);

    // Título: giro 3D letra por letra, rápido.
    if (titleChars.length) {
      tl.add(titleChars, {
        rotateY: [-90, 0],
        opacity: [0, 1],
        duration: 460,
        ease: 'outBack',
        delay: stagger(13),
      }, 120);
    }

    tl.add('.hero__sub', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 520,
      ease: 'outExpo',
    }, 360)
      .add('.hero__ctas .btn', {
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 520,
        ease: 'outBack',
        delay: stagger(70),
      }, 480)

      // ── Columna derecha (diagrama): arranca a 180ms, en paralelo con el título ──
      .add('.diagram__label, .diagram__stack .tier', {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 520,
        ease: 'outExpo',
        delay: stagger(70),
      }, 180)
      .add('.diagram__tech .tech', {
        scale: [0.85, 1],
        opacity: [0, 1],
        duration: 500,
        ease: 'outBack',
        delay: stagger(50),
      }, 440)
      .add('.diagram__chip', {
        opacity: [0, 1],
        duration: 520,
        ease: 'outExpo',
        delay: stagger(55),
      }, 560)
      // Geometría decorativa: opacidad sutil 0.25, en paralelo con los chips ('<').
      .add('.diagram__deco svg', {
        opacity: [0, 0.25],
        duration: 520,
        ease: 'outExpo',
        delay: stagger(55),
      }, '<');

    // Loop sutil de la flecha del CTA principal para invitar al clic.
    animate('.hero__ctas .btn--accent svg', {
      translateX: [0, 4],
      alternate: true,
      loop: true,
      ease: 'inOutSine',
      duration: 850,
    });
  }
}
