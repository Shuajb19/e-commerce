import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiResponse} from '../models/ApiResponseModel';

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
