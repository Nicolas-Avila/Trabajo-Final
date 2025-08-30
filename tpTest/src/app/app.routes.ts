import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./session/session.route').then((m) => m.session_routes),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
