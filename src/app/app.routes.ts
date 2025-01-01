import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'access',
    loadChildren: () =>
      import('./modules/access/access-routing.module').then(
        (m) => m.AccessRoutingModule
      ),
  },
  { path: '**', redirectTo: 'access/login' }, // Fallback route
];
