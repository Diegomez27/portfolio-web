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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesSectionComponent,
    DemosSectionComponent,
    ContactSectionComponent,
    CursorRingDirective,
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
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private scrollTo(c: Chapter): void {
    const el = this.scroller?.nativeElement.querySelector<HTMLElement>('#' + c);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
