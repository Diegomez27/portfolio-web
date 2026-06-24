import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <p class="footer__copy">
          &copy; {{ year }} Diego — Sistemas web empresariales
        </p>
        <div class="footer__links">
          <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--color-border);
      padding-block: 2rem;

      &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }

      &__copy {
        font-size: 0.875rem;
        color: var(--color-text-muted);
      }

      &__links {
        display: flex;
        gap: 1.5rem;

        a {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          transition: color var(--transition);
          &:hover { color: var(--color-accent-light); }
        }
      }
    }
  `],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
