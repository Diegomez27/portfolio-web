import { Injectable, signal } from '@angular/core';

export type Chapter = 'home' | 'work' | 'services' | 'contact';

@Injectable({ providedIn: 'root' })
export class ChapterService {
  /** Capítulo visible actualmente (lo actualiza el observer al hacer scroll). */
  readonly active = signal<Chapter>('home');

  /** Intención de navegación: el shell hace scroll cuando cambia el nonce. */
  readonly request = signal<{ chapter: Chapter; nonce: number } | null>(null);
  private nonce = 0;

  /** Pide navegar a un capítulo (rail, CTAs del hero, etc.). */
  go(c: Chapter): void {
    this.request.set({ chapter: c, nonce: ++this.nonce });
  }

  /** Marca el capítulo activo (lo usa el observer del shell). */
  setActive(c: Chapter): void {
    this.active.set(c);
  }
}
