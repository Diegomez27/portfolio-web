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
      // siguiente frame para garantizar que el estado base ya pintó
      requestAnimationFrame(() => this.ready.set(true));
    }
  }
}
