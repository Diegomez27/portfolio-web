import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  // Rutas futuras (lazy-loaded)
  // {
  //   path: 'demos',
  //   loadComponent: () =>
  //     import('./features/demos/demos.component').then((m) => m.DemosComponent),
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
