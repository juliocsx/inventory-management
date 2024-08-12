import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dotenv from 'dotenv';

interface ProductType {
  id: string;
  describe: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface ProductTypeResponse {
  message: string;
  data: ProductType[];
}

dotenv.config();
@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  
  private baseUrl = process.env['API_URL'];

  constructor(private http: HttpClient) { }

  getProductTypes() {
    return this.http.get<ProductTypeResponse>(`${this.baseUrl}/product-types`);
  }
}
