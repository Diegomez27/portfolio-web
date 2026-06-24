import { Component } from '@angular/core';

@Component({
  selector: 'app-demos-section',
  standalone: true,
  template: `
    <section id="demos" class="section">
      <div class="container">
        <span class="section-label">Demos en vivo</span>
        <h2 class="section-title">Proyectos funcionales y deployados</h2>
        <p class="section-subtitle">
          Cada demo es un proyecto real con código limpio, diseño cuidado y deploy en producción.
          Puedes explorarlos, probarlos e incluso clonarlos.
        </p>

        <!-- Placeholder — se poblará con demos reales en Fase 3 -->
        <div class="demos-empty">
          <div class="demos-empty__icon">🚀</div>
          <p class="demos-empty__title">Primeras demos en camino</p>
          <p class="demos-empty__sub">
            Landing page de restaurante · CRM básico · más próximamente
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .demos-empty {
      margin-top: 3rem;
      padding: 4rem 2rem;
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-lg);
      text-align: center;

      &__icon { font-size: 2.5rem; margin-bottom: 1rem; }

      &__title {
        font-family: var(--font-heading);
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--color-text);
      }

      &__sub {
        font-size: 0.9375rem;
        color: var(--color-text-muted);
      }
    }
  `],
})
export class DemosSectionComponent {}
