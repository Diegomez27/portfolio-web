import { Component } from '@angular/core';

interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
})
export class ServicesSectionComponent {
  readonly services: Service[] = [
    {
      num: '01',
      title: 'Sistemas empresariales a la medida',
      description:
        'Dashboards, CRMs y paneles administrativos con roles, reportería y exportación. Construidos para operar el día a día de tu negocio.',
      tags: ['Angular', 'NestJS', 'PostgreSQL'],
    },
    {
      num: '02',
      title: 'Apps en tiempo real',
      description:
        'POS, tracking y colaboración en vivo con WebSockets. Estado sincronizado de baja latencia entre dispositivos y sucursales.',
      tags: ['WebSockets', 'Redis', 'Signals'],
    },
    {
      num: '03',
      title: 'APIs y backend escalable',
      description:
        'Servicios REST y de eventos bien tipados, validados y documentados. Arquitectura modular lista para crecer sin reescribir.',
      tags: ['NestJS', 'REST', 'Docker'],
    },
    {
      num: '04',
      title: 'Frontend de alto rendimiento',
      description:
        'Interfaces rápidas y accesibles con Angular moderno: signals, lazy-loading y un sistema de diseño consistente.',
      tags: ['Angular', 'SCSS', 'a11y'],
    },
  ];
}
