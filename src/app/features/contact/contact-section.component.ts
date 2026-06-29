import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ContactService,
  ContactPayload,
} from '../../core/services/contact.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

type LinkIcon = 'email' | 'github' | 'linkedin';

interface ContactLink {
  kind: string;
  value: string;
  href: string;
  icon: LinkIcon;
  tooltipKey: string;
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
  readonly emailCopied = signal<boolean>(false);

  readonly form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    email:       ['', [Validators.required, Validators.email]],
    projectType: ['', Validators.required],
    message:     ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly projectTypes: ProjectType[] = [
    { value: 'Sistema a la medida',       labelKey: 'pt.systems' },
    { value: 'App en tiempo real / POS',  labelKey: 'pt.realtime' },
    { value: 'Landing page / Sitio web',  labelKey: 'pt.landing' },
    { value: 'Otro',                      labelKey: 'pt.other' },
  ];

  readonly links: ContactLink[] = [
    {
      kind: 'Email',
      value: 'diegomez27@outlook.com',
      href: 'mailto:diegomez27@outlook.com',
      icon: 'email',
      tooltipKey: 'contact.tooltip.email',
    },
    {
      kind: 'GitHub',
      value: 'github.com/Diegomez27',
      href: 'https://github.com/Diegomez27',
      icon: 'github',
      tooltipKey: 'contact.tooltip.github',
    },
    {
      kind: 'LinkedIn',
      value: 'linkedin.com/in/diego-gomez',
      href: 'https://www.linkedin.com/in/diego-alejandro-g%C3%B3mez-serrano-9abbb038a/',
      icon: 'linkedin',
      tooltipKey: 'contact.tooltip.linkedin',
    },
  ];

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  onLinkClick(e: MouseEvent, l: ContactLink): void {
    if (l.icon === 'email') {
      e.preventDefault();
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(l.value).then(() => {
          this.emailCopied.set(true);
          setTimeout(() => this.emailCopied.set(false), 2000);
        });
      }
    }
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
