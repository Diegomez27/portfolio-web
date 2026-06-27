import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ContactService,
  ContactPayload,
} from '../../core/services/contact.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactLink {
  kind: string;
  value: string;
  href: string;
}

interface ProjectType {
  value: string;   // valor canónico en español (lo espera el backend)
  labelKey: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective, TranslatePipe],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly formState = signal<FormState>('idle');

  readonly form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    email:       ['', [Validators.required, Validators.email]],
    projectType: ['', Validators.required],
    message:     ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly projectTypes: ProjectType[] = [
    { value: 'Landing page',                    labelKey: 'pt.landing' },
    { value: 'Sistema de gestión / dashboard',  labelKey: 'pt.dashboard' },
    { value: 'Integración SAT / fiscal',        labelKey: 'pt.fiscal' },
    { value: 'SaaS multi-tenant',               labelKey: 'pt.saas' },
    { value: 'Otro',                            labelKey: 'pt.other' },
  ];

  readonly links: ContactLink[] = [
    {
      kind: 'Email',
      value: 'diegomez27@outlook.com',
      href: 'mailto:diegomez27@outlook.com',
    },
    {
      kind: 'GitHub',
      value: 'github.com/Diegomez27',
      href: 'https://github.com/Diegomez27',
    },
    {
      kind: 'LinkedIn',
      value: 'linkedin.com/in/diego-gomez',
      href: 'https://www.linkedin.com/in/diego-alejandro-g%C3%B3mez-serrano-9abbb038a/',
    },
  ];

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formState.set('submitting');

    const { name, email, projectType, message } = this.form.getRawValue();
    const payload: ContactPayload = {
      name: name ?? '',
      email: email ?? '',
      projectType: projectType ?? '',
      message: message ?? '',
    };

    this.contactService.send(payload).subscribe({
      next: () => {
        this.formState.set('success');
        this.form.reset();
      },
      error: () => {
        this.formState.set('error');
      },
    });
  }
}
