import { Routes } from '@angular/router';

// La navegación ahora es por capítulos (ChapterService), no por URL.
// Se mantiene el router para el redirect catch-all.
export const routes: Routes = [
  { path: '**', redirectTo: '' },
];
