import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
})
export class ServicesSectionComponent {
  readonly services: Service[] = [
    {
      icon: '🌐',
      title: 'Landing pages profesionales',
      description:
        'Sitios de presentación, marketing y ventas con diseño enterprise. Conversión, performance y PWA-ready.',
      tags: ['Angular', 'SCSS', 'Vercel'],
    },
    {
      icon: '📊',
      title: 'Sistemas de gestión y reportería',
      description:
        'Dashboards, CRMs y paneles administrativos con exportación a Excel/PDF y roles de acceso granulares.',
      tags: ['Angular', 'NestJS', 'Chart.js'],
    },
    {
      icon: '🧾',
      title: 'Integración SAT / fiscal',
      description:
        'Procesamiento CFDI, Anexos 30 y 31, validación de UUIDs y RFCs, reportes mensuales formato SAT.',
      tags: ['CFDI', 'Anexo 30/31', 'NestJS'],
    },
    {
      icon: '🏗️',
      title: 'SaaS multi-tenant',
      description:
        'Plataformas con roles, permisos y arquitectura escalable. Aislamiento por tenant y white-labeling.',
      tags: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    },
  ];
}
