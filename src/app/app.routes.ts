import { Routes } from '@angular/router';
import {ProductsListComponent} from './features/products/pages/products-list/products-list.component';
import {ProductDetailsComponent} from './features/products/pages/product-details/product-details.component';

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
    path: 'products/:id',
    component: ProductDetailsComponent,
  }
];

