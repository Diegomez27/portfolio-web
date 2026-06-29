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
  private io?: IntersectionObserver;

  readonly chapters = [
    { id: 'home',     num: '01', label: 'Inicio'    },
    { id: 'work',     num: '02', label: 'Trabajo'   },
    { id: 'services', num: '03', label: 'Servicios' },
    { id: 'contact',  num: '04', label: 'Contacto'  },
  ] as const;

  constructor() {
    // Cuando algo pide navegar, hacemos scroll suave a la sección.
    effect(() => {
      const req = this.nav.request();
      if (req) this.scrollTo(req.chapter);
    });
  }

  private wheelListener?: (e: WheelEvent) => void;
  private keyListener?: (e: KeyboardEvent) => void;

  ngAfterViewInit(): void {
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
  }

  private scrollTo(c: Chapter): void {
    const el = this.scroller?.nativeElement.querySelector<HTMLElement>('#' + c);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
