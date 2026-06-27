import { Injectable, effect, signal } from '@angular/core';

export type Accent = 'ember' | 'blue' | 'green' | 'magenta';
export type Mode = 'light' | 'dark';

const ACCENT_KEY = 'pf-accent';
const MODE_KEY = 'pf-mode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly accents: { id: Accent; label: string; color: string }[] = [
    { id: 'ember',   label: 'Carmín',    color: '#6E1524' },
    { id: 'blue',    label: 'Azul',      color: '#2D6BE4' },
    { id: 'green',   label: 'Verde',     color: '#0F8A6B' },
    { id: 'magenta', label: 'Magenta',   color: '#D4308A' },
  ];

  readonly accent = signal<Accent>(this.initialAccent());
  readonly mode = signal<Mode>(this.initialMode());

  constructor() {
    // Aplica y persiste el tema cada vez que cambia.
    effect(() => {
      const a = this.accent();
      const m = this.mode();
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      root.setAttribute('data-accent', a);
      root.setAttribute('data-theme', m);
      this.write(ACCENT_KEY, a);
      this.write(MODE_KEY, m);
    });
  }

  setAccent(a: Accent): void {
    this.accent.set(a);
  }

  toggleMode(): void {
    this.mode.update((m) => (m === 'light' ? 'dark' : 'light'));
  }

  private initialAccent(): Accent {
    const saved = this.read(ACCENT_KEY);
    return (saved as Accent) ?? 'ember';
  }

  private initialMode(): Mode {
    const saved = this.read(MODE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
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
