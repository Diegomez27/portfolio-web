import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

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
export class ServicesSectionComponent {
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
}
