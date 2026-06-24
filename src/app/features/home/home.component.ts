import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ServicesSectionComponent } from '../services-section/services-section.component';
import { DemosSectionComponent } from '../demos/demos-section.component';
import { ContactSectionComponent } from '../contact/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesSectionComponent,
    DemosSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero />
    <app-services-section />
    <app-demos-section />
    <app-contact-section />
  `,
})
export class HomeComponent {}
