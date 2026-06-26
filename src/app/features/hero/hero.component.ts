import {
  AfterViewInit,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChapterService } from '../../core/services/chapter.service';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParallaxDirective, MagneticDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  readonly nav = inject(ChapterService);

  /** Activa la animación de reveal solo cuando JS confirma que puede correr. */
  readonly ready = signal(false);

  readonly stack = [
    { name: 'Angular',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
    { name: 'NestJS',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  ];

  readonly tiers = [
    { name: 'Frontend',    tech: 'Angular · Signals' },
    { name: 'API Gateway', tech: 'NestJS · REST + WS'   },
    { name: 'Data',        tech: 'PostgreSQL · RLS'     },
  ];

  readonly chips = ['auth', 'billing', 'multi-tenant', 'api gateway', 'realtime'];

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
