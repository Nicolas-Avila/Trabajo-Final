import { Routes } from '@angular/router';
import { BaseComponent } from './view/base/base.component';

export const session_routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./view/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./view/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];
