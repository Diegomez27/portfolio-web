import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

/**
 * Traduce una clave al idioma activo. Impuro a propósito: se reevalúa en cada
 * ciclo de detección, así el cambio de idioma (signal) se refleja al instante.
 */
@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly locale = inject(LocaleService);

  transform(key: string): string {
    return this.locale.translate(key, this.locale.lang());
  }
}
