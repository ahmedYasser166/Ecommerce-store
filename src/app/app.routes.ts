import { Routes } from '@angular/router';
import { NotfoundComponent } from './features/pages/notfound/notfound.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then((m) => m.HomeComponent),title: 'Home'
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/pages/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),title: 'product-details'
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/pages/cart/cart.component').then((m) => m.CartComponent),title: 'Cart'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
