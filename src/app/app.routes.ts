import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then(m => m.MainPage)
  },
  {
    path: 'carro-compras',
    loadComponent: () => import('./carro-compras/carro-compras.page').then(m => m.CarroComprasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then(m => m.AdminPage),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'crud',
    loadComponent: () => import('./crud/crud.page').then(m => m.CrudPage)
  },
];