import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-demos-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './demos-section.component.html',
  styleUrl: './demos-section.component.scss',
})
export class DemosSectionComponent {}
