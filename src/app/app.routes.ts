import { Routes } from '@angular/router';
import {ProductsListComponent} from './features/products/pages/products-list/products-list.component';
import { CartListComponent } from './features/cart/pages/cart-list/cart-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'cart-list',
    component: CartListComponent,
  },
];

