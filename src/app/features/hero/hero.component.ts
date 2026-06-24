import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly stackChips = ['Angular', 'NestJS', 'PostgreSQL', 'Docker'];

  scrollToContact(): void {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToDemos(): void {
    document.querySelector('#demos')?.scrollIntoView({ behavior: 'smooth' });
  }
}
