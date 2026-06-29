import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { LocaleService } from '../../../core/services/locale.service';

@Component({
  selector: 'app-theme-control',
  standalone: true,
  template: `
    <div class="theme">
      <button
        type="button"
        class="theme__lang"
        [attr.aria-label]="locale.lang() === 'es' ? 'Switch to English' : 'Cambiar a español'"
        (click)="locale.toggle()">
        {{ locale.lang() === 'es' ? 'EN' : 'ES' }}
      </button>

      <div class="theme__accents" role="group" aria-label="Color de acento">
        @for (a of theme.accents; track a.id) {
          <button
            type="button"
            class="theme__dot"
            [class.active]="theme.accent() === a.id"
            [style.--c]="a.color"
            [attr.aria-pressed]="theme.accent() === a.id"
            [attr.aria-label]="'Acento ' + a.label"
            [title]="a.label"
            (click)="theme.setAccent(a.id)">
          </button>
        }

        <!-- Botón selector personalizado -->
        <div
          class="theme__dot theme__dot--custom"
          [class.active]="theme.accent() === 'custom'"
          [style.--c]="theme.customColor()"
          title="Color personalizado">
          <svg class="theme__palette-icon" viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c1.25 0 2.25-1 2.25-2.25.04-.58.28-1.1.66-1.48.38-.38.9-.62 1.48-.66h.04c1.25 0 2.57-1 2.57-2.25a9.3 9.3 0 0 0-.25-2C19.78 5.75 16.27 2 12 2Zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
          </svg>
          <input
            type="color"
            class="theme__color-input"
            [value]="theme.customColor()"
            [attr.aria-label]="'Elegir color de acento personalizado'"
            (input)="onCustomColorChange($event)">
        </div>
      </div>

      <button
        type="button"
        class="theme__mode"
        [attr.aria-label]="theme.mode() === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'"
        [title]="theme.mode() === 'light' ? 'Modo oscuro' : 'Modo claro'"
        (click)="theme.toggleMode()">
        @if (theme.mode() === 'light') {
          <!-- luna -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        } @else {
          <!-- sol -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        }
      </button>
    </div>
  `,
  styles: [`
    /* cluster cohesivo: un solo contenedor segmentado */
    .theme {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 5px 6px;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius-pill);
    }

    .theme__lang {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--muted);
      padding: 5px 8px;
      border-radius: var(--radius-pill);
      transition: color var(--transition), background var(--transition);

      &:hover { color: var(--ink); background: var(--accent-soft); }
    }

    /* divisores sutiles entre los tres grupos */
    .theme__accents {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 0 10px;
      border-left: 1px solid var(--line);
      border-right: 1px solid var(--line);
    }

    .theme__dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: var(--c);
      outline-offset: 2px;
      transition: transform var(--transition), box-shadow var(--transition);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);

      &:hover { transform: scale(1.18); }

      &.active {
        box-shadow: 0 0 0 2px var(--panel), 0 0 0 4px var(--c);
      }
    }

    .theme__dot--custom {
      position: relative;
      display: inline-grid;
      place-items: center;
      cursor: pointer;
      overflow: hidden;

      &:not(.active) {
        background: conic-gradient(from 0deg, #ff4500, #ff8c00, #ffd700, #32cd32, #00ced1, #1e90ff, #9370db, #ff1493, #ff4500);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
      }
    }

    .theme__palette-icon {
      color: #ffffff;
      mix-blend-mode: difference;
      pointer-events: none;
      z-index: 1;
    }

    .theme__color-input {
      position: absolute;
      inset: -5px;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      opacity: 0;
      cursor: pointer;
      border: none;
      padding: 0;
    }

    .theme__mode {
      display: inline-grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: var(--muted);
      transition: color var(--transition), background var(--transition);

      &:hover { color: var(--ink); background: var(--accent-soft); }
    }
  `],
})
export class ThemeControlComponent {
  readonly theme = inject(ThemeService);
  readonly locale = inject(LocaleService);

  onCustomColorChange(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this.theme.setCustomColor(val);
  }
}
