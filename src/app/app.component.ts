import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { Chapter, ChapterService } from './core/services/chapter.service';
import { HeroComponent } from './features/hero/hero.component';
import { ServicesSectionComponent } from './features/services-section/services-section.component';
import { DemosSectionComponent } from './features/demos/demos-section.component';
import { ContactSectionComponent } from './features/contact/contact-section.component';
import { CursorRingDirective } from './shared/directives/cursor-ring.directive';
import { ThemeControlComponent } from './shared/components/theme-control/theme-control.component';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { animate, stagger, createDrawable, cubicBezier, utils } from 'animejs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesSectionComponent,
    DemosSectionComponent,
    ContactSectionComponent,
    CursorRingDirective,
    ThemeControlComponent,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  readonly nav = inject(ChapterService);

  @ViewChild('scroller') scroller!: ElementRef<HTMLElement>;
  @ViewChild('indicator') indicatorRef?: ElementRef<HTMLElement>;
  private io?: IntersectionObserver;
  private isReady = false;
  private resizeListener?: () => void;

  readonly chapters = [
    { id: 'home',     num: '01', label: 'Inicio'    },
    { id: 'services', num: '02', label: 'Servicios' },
    { id: 'work',     num: '03', label: 'Trabajo'   },
    { id: 'contact',  num: '04', label: 'Contacto'  },
  ] as const;

  constructor() {
    // Cuando algo pide navegar, hacemos scroll suave a la sección.
    effect(() => {
      const req = this.nav.request();
      if (req) this.scrollTo(req.chapter);
    });

    // Escuchamos el capítulo activo para mover el indicador deslizante del sidebar
    effect(() => {
      const active = this.nav.active();
      if (this.isReady) {
        this.updateIndicator(active);
      }
    });
  }

  private wheelListener?: (e: WheelEvent) => void;
  private keyListener?: (e: KeyboardEvent) => void;

  ngAfterViewInit(): void {
    this.isReady = true;

    // Inicializar el indicador deslizante y listeners de tamaño
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.updateIndicator(this.nav.active(), true);
      }, 150);

      this.resizeListener = () => {
        this.updateIndicator(this.nav.active(), true);
      };
      window.addEventListener('resize', this.resizeListener, { passive: true });

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduce) {
        this.initIntroAnimations();
      }
    }

    const root = this.scroller.nativeElement;
    const views = Array.from(root.querySelectorAll<HTMLElement>('.view'));

    // El capítulo activo es el que cruza el centro del área de scroll.
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.nav.setActive(e.target.id as Chapter);
          }
        }
      },
      { root, threshold: 0, rootMargin: '-45% 0px -45% 0px' },
    );

    views.forEach((v) => this.io!.observe(v));

    // Custom desktop wheel scroll handler to transition smoothly between sections
    let lastScrollTime = 0;
    const throttleTime = 450;

    this.wheelListener = (e: WheelEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth < 1100) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < throttleTime) return;

      const current = this.nav.active();
      const idx = this.chapters.findIndex(c => c.id === current);

      if (e.deltaY > 0) {
        if (idx < this.chapters.length - 1) {
          lastScrollTime = now;
          this.nav.go(this.chapters[idx + 1].id);
        }
      } else if (e.deltaY < 0) {
        if (idx > 0) {
          lastScrollTime = now;
          this.nav.go(this.chapters[idx - 1].id);
        }
      }
    };

    root.addEventListener('wheel', this.wheelListener, { passive: false });

    // Keyboard navigation listener (desktop only, accessibility)
    this.keyListener = (e: KeyboardEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth < 1100) return;

      // Avoid capturing navigation shortcuts inside text fields
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT'
      )) {
        return;
      }

      const now = Date.now();
      if (now - lastScrollTime < throttleTime) return;

      const current = this.nav.active();
      const idx = this.chapters.findIndex(c => c.id === current);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (idx < this.chapters.length - 1) {
          e.preventDefault();
          lastScrollTime = now;
          this.nav.go(this.chapters[idx + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (idx > 0) {
          e.preventDefault();
          lastScrollTime = now;
          this.nav.go(this.chapters[idx - 1].id);
        }
      }
    };

    window.addEventListener('keydown', this.keyListener);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    if (this.wheelListener && this.scroller) {
      this.scroller.nativeElement.removeEventListener('wheel', this.wheelListener);
    }
    if (this.keyListener) {
      window.removeEventListener('keydown', this.keyListener);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private scrollTo(c: Chapter): void {
    const el = this.scroller?.nativeElement.querySelector<HTMLElement>('#' + c);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  private updateIndicator(chapterId: string, immediate = false): void {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1100) return; // solo en desktop

    const navEl = this.scroller.nativeElement.ownerDocument.querySelector('.rail__nav');
    const indicatorEl = this.indicatorRef?.nativeElement;
    if (!navEl || !indicatorEl) return;

    const activeBtn = navEl.querySelector(`[data-id="${chapterId}"]`) as HTMLElement;
    if (!activeBtn) {
      indicatorEl.classList.remove('visible');
      return;
    }

    const navRect = navEl.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const targetTop = btnRect.top - navRect.top;
    const targetHeight = btnRect.height;

    indicatorEl.classList.add('visible');
    utils.remove(indicatorEl);

    if (immediate) {
      indicatorEl.style.transform = `translateY(${targetTop}px)`;
      indicatorEl.style.height = `${targetHeight}px`;
    } else {
      animate(indicatorEl, {
        translateY: targetTop,
        height: targetHeight,
        duration: 380,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      });
    }
  }

  private initIntroAnimations(): void {
    // 1. Dibujado de las líneas técnicas (blueprint) en las órbitas SVG.
    // createDrawable inicia los trazos ocultos (0 0) y los dibuja hasta 0 1.
    const blueprint = createDrawable('.rail__orbit line, .rail__orbit circle');
    animate(blueprint, {
      draw: ['0 0', '0 1'],
      ease: 'inOutSine',
      duration: 1200,
      delay: stagger(60),
    });

    // 2. Escalado y entrada de los nodos orbitales
    animate(
      [
        '.rail__orbit rect',
        '.rail__orbit .orbit-node-dot',
        '.rail__orbit .orbit-node-dot-large',
        '.rail__orbit .orbit-node-dot-small',
      ],
      {
        scale: [0, 1],
        opacity: [0, 1],
        ease: 'outElastic(1, .85)',
        duration: 1000,
        delay: 400,
      },
    );

    // 3. Stagger (entrada escalonada) de los ítems de navegación en la barra lateral
    animate('.rail__nav .nav-row', {
      translateX: [-15, 0],
      opacity: [0, 1],
      ease: 'outExpo',
      duration: 800,
      delay: stagger(80, { start: 500 }),
    });

    // 4. Stagger de redes sociales y estado
    animate('.rail__foot > *', {
      translateY: [15, 0],
      opacity: [0, 1],
      ease: 'outExpo',
      duration: 800,
      delay: stagger(60, { start: 800 }),
    });

    // 5. Rebote continuo de la flecha "scroll para explorar"
    animate('.scroll-hint__arrow', {
      translateY: [0, 6],
      alternate: true,
      loop: true,
      ease: 'inOutQuad',
      duration: 720,
    });
  }
}
