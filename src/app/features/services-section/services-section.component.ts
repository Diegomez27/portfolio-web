import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface Service {
  num: string;
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
export class ServicesSectionComponent {
  readonly services: Service[] = [
    {
      num: '01',
      titleKey: 'services.s1.title',
      descKey: 'services.s1.desc',
      tags: ['Angular', 'NestJS', 'PostgreSQL'],
    },
    {
      num: '02',
      titleKey: 'services.s2.title',
      descKey: 'services.s2.desc',
      tags: ['WebSockets', 'Redis', 'Signals'],
    },
    {
      num: '03',
      titleKey: 'services.s3.title',
      descKey: 'services.s3.desc',
      tags: ['NestJS', 'REST', 'Docker'],
    },
    {
      num: '04',
      titleKey: 'services.s4.title',
      descKey: 'services.s4.desc',
      tags: ['Angular', 'SCSS', 'a11y'],
    },
  ];
}
