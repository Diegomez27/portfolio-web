import { Component, ElementRef, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  ContactService,
  ContactPayload,
} from '../../core/services/contact.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { animate, createDrawable } from 'animejs';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

type LinkIcon = 'email' | 'github' | 'linkedin' | 'whatsapp';

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
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  readonly formState = signal<FormState>('idle');
  readonly emailCopied = signal<boolean>(false);

  constructor() {
    // Reacciona al resultado del envío para animar la respuesta del formulario.
    effect(() => {
      const state = this.formState();
      if (this.reduce()) return;
      if (state === 'success') {
        requestAnimationFrame(() => this.animateSuccess());
      } else if (state === 'error') {
        requestAnimationFrame(() => this.animateError());
      }
    });
  }

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    projectType: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
    // Honeypot anti-spam: campo sin validadores, oculto visualmente en el
    // template. Un humano nunca lo llena; un bot que autocompleta todo el
    // formulario sí. Ver ContactController.create en portfolio-api.
    website: [''],
  });

  readonly projectTypes: ProjectType[] = [
    { value: 'Sistema a la medida', labelKey: 'pt.systems' },
    { value: 'App en tiempo real / POS', labelKey: 'pt.realtime' },
    { value: 'Landing page / Sitio web', labelKey: 'pt.landing' },
    { value: 'Otro', labelKey: 'pt.other' },
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
      kind: 'WhatsApp',
      value: 'contact.whatsappValue',
      href: 'https://wa.me/526681448682?text=Hola%20Diego,%20me%20interesa%20cotizar%20un%20desarrollo',
      icon: 'whatsapp',
      tooltipKey: 'contact.tooltip.whatsapp',
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

    const { name, email, projectType, message, website } = this.form.getRawValue();
    const payload: ContactPayload = {
      name: name ?? '',
      email: email ?? '',
      projectType: projectType ?? '',
      message: message ?? '',
      website: website ?? '',
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

  /** Entrada del bloque de éxito: escala + dibujado del checkmark. */
  private animateSuccess(): void {
    const block =
      this.host.nativeElement.querySelector<HTMLElement>('.contact__success');
    if (!block) return;

    animate(block, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 480,
      ease: 'outExpo',
    });

    const icon = block.querySelector<HTMLElement>('.contact__success-icon');
    if (icon) {
      animate(icon, { scale: [0, 1], duration: 620, ease: 'outBack', delay: 90 });
    }

    const check = block.querySelector<SVGPathElement>('.contact__success-icon path');
    if (check) {
      const [drawable] = createDrawable(check);
      animate(drawable, {
        draw: ['0 0', '0 1'],
        duration: 560,
        ease: 'outQuad',
        delay: 240,
      });
    }
  }

  /** Error de envío: sacude el formulario y revela el mensaje. */
  private animateError(): void {
    const form = this.host.nativeElement.querySelector<HTMLElement>('.form');
    if (form) {
      animate(form, {
        translateX: [0, -9, 8, -6, 5, -2, 0],
        duration: 460,
        ease: 'inOutSine',
      });
    }
    const err =
      this.host.nativeElement.querySelector<HTMLElement>('.form__server-error');
    if (err) {
      animate(err, {
        opacity: [0, 1],
        translateY: [-6, 0],
        duration: 340,
        ease: 'outExpo',
      });
    }
  }

  private reduce(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
