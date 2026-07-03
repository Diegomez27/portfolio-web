import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface Demo {
  id: string;
  titleKey: string;
  descKey: string;
  category: 'landing' | 'sistema' | 'tiempo-real' | 'integración';
  tags: string[];
  url: string;
  imgUrl: string;
}

import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-demos-section',
  standalone: true,
  imports: [TranslatePipe, RevealDirective],
  templateUrl: './demos-section.component.html',
  styleUrl: './demos-section.component.scss',
})
export class DemosSectionComponent {
  readonly demos: Demo[] = [
    {
      id: 'cafe',
      titleKey: 'demo.cafe.title',
      descKey: 'demo.cafe.desc',
      category: 'landing',
      tags: ['Angular 20', 'SCSS', 'Mobile-first'],
      url: 'https://cafeteria.diego-gomez-desarrollo-web.com/',
      imgUrl:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'barber',
      titleKey: 'demo.barber.title',
      descKey: 'demo.barber.desc',
      category: 'landing',
      tags: ['Angular 20', 'SCSS', 'Mobile-first'],
      url: 'https://barber.diego-gomez-desarrollo-web.com/',
      imgUrl:
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'consultorio',
      titleKey: 'demo.consultorio.title',
      descKey: 'demo.consultorio.desc',
      category: 'landing',
      tags: ['Angular 20', 'SCSS', 'Mobile-first'],
      url: 'https://consultorio.diego-gomez-desarrollo-web.com/',
      imgUrl:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  readonly categoryKey: Record<Demo['category'], string> = {
    landing: 'demo.category.landing',
    sistema: 'demo.category.sistema',
    'tiempo-real': 'demo.category.tiempo-real',
    integración: 'demo.category.integración',
  };
}
