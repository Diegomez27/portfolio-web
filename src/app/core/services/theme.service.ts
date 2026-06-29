import { Injectable, effect, signal } from '@angular/core';

export type Accent = 'ember' | 'blue' | 'green' | 'magenta' | 'custom';
export type Mode = 'light' | 'dark';

const ACCENT_KEY = 'pf-accent';
const MODE_KEY = 'pf-mode';
const CUSTOM_COLOR_KEY = 'pf-custom-color';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly accents: { id: Accent; label: string; color: string }[] = [
    { id: 'ember',   label: 'Carmín',    color: '#6E1524' },
    { id: 'blue',    label: 'Índigo',    color: '#244D73' },
    { id: 'green',   label: 'Pino',      color: '#275A44' },
    { id: 'magenta', label: 'Ciruela',   color: '#512457' },
  ];

  readonly accent = signal<Accent>(this.initialAccent());
  readonly mode = signal<Mode>(this.initialMode());
  readonly customColor = signal<string>(this.initialCustomColor());

  constructor() {
    // Aplica y persiste el tema cada vez que cambia.
    effect(() => {
      const a = this.accent();
      const m = this.mode();
      const c = this.customColor();
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      root.setAttribute('data-accent', a);
      root.setAttribute('data-theme', m);
      this.write(ACCENT_KEY, a);
      this.write(MODE_KEY, m);

      if (a === 'custom') {
        root.style.setProperty('--accent', c);
      } else {
        root.style.removeProperty('--accent');
      }
    });
  }

  setAccent(a: Accent): void {
    this.accent.set(a);
  }

  setCustomColor(color: string): void {
    this.customColor.set(color);
    this.accent.set('custom');
    this.write(CUSTOM_COLOR_KEY, color);
  }

  toggleMode(): void {
    this.mode.update((m) => (m === 'light' ? 'dark' : 'light'));
  }

  private initialAccent(): Accent {
    const saved = this.read(ACCENT_KEY);
    return (saved as Accent) ?? 'ember';
  }

  private initialCustomColor(): string {
    const saved = this.read(CUSTOM_COLOR_KEY);
    return saved ?? '#6E1524';
  }

  private initialMode(): Mode {
    const saved = this.read(MODE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Default: modo claro para visitantes nuevos (la preferencia se persiste).
    return 'light';
  }

  private read(k: string): string | null {
    try {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null;
    } catch {
      return null;
    }
  }

  private write(k: string, v: string): void {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* ignore (modo privado / SSR) */
    }
  }
}
