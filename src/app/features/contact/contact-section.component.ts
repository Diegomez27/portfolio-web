import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ContactService,
  ContactPayload,
} from '../../core/services/contact.service';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactLink {
  kind: string;
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  readonly projectTypes = [
    'Landing page',
    'Sistema de gestión / dashboard',
    'Integración SAT / fiscal',
    'SaaS multi-tenant',
    'Otro',
  ];

  readonly links: ContactLink[] = [
    {
      kind: 'Email',
      label: 'Escríbeme',
      value: 'diegomez27@outlook.com',
      href: 'mailto:diegomez27@outlook.com',
    },
    {
      kind: 'GitHub',
      label: 'Código',
      value: 'github.com/Diegomez27',
      href: 'https://github.com/Diegomez27',
    },
    {
      kind: 'LinkedIn',
      label: 'Perfil',
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
