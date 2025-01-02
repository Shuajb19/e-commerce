import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  code: string;
  generic_name_en: string;
  brands?: string;
  categories?: string;
  image_url?: string;
}

export interface ApiResponse {
  products: Product[];
  count: number;
  page: number;
  page_size: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'https://world.openfoodfacts.org/api/v0';

  constructor(private http: HttpClient) { }

  getProducts(page: any, pageSize: any) {
    const url = `${this.API_URL}/search.json?page=${page}&page_size=${pageSize}`;
    return this.http.get<ApiResponse>(url);
  }
}
