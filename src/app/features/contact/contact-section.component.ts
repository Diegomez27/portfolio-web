import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { finalize } from 'rxjs';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

    this.contactService
      .send(this.form.value as never)
      .pipe(finalize(() => {
        // finalize runs whether success or error
      }))
      .subscribe({
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
