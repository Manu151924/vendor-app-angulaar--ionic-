import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>import ('./login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'delivery',
    loadComponent: () => import('./delivery/delivery.page').then( m => m.DeliveryPage)
  },
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.page').then( m => m.BookingPage)
  },
];
