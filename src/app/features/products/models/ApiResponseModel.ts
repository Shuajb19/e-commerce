import {Product} from './ProductModel';

export interface ApiResponse {
  products: Product[];
  count: number;
  page: number;
  page_size: number;
}
