import { Injectable, effect, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from '../i18n/translations';

const LANG_KEY = 'pf-lang';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    effect(() => {
      const l = this.lang();
      if (typeof document === 'undefined') return;
      document.documentElement.lang = l;
      document.title = this.translate('meta.title', l);
      this.setMeta('description', this.translate('meta.desc', l));
      this.write(LANG_KEY, l);
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }

  set(l: Lang): void {
    this.lang.set(l);
  }

  translate(key: string, lang: Lang = this.lang()): string {
    return TRANSLATIONS[lang][key] ?? TRANSLATIONS.es[key] ?? key;
  }

  private initialLang(): Lang {
    const saved = this.read(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    // Default: español para visitantes nuevos (la preferencia se persiste).
    return 'es';
  }

  private setMeta(name: string, content: string): void {
    let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
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
      /* ignore */
    }
  }
}
