import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.css'
})
export class ProductTypeComponent {
  productTypes = [
    { id: 1, name: "Café", price: 10 },
    { id: 2, name: "Chocolate", price: 20 }
  ]

  selectedProductTypeId: number | null = null;

  products = [
    { productTypeId: 1, quantity: 6, expiryDate: '2024-12-31' },
    { productTypeId: 1, quantity: 10, expiryDate: '2024-11-16' },
    { productTypeId: 2, quantity: 5, expiryDate: '2025-04-06' }
  ]

  selectProductType(id: number): void {
    this.selectedProductTypeId = this.selectedProductTypeId === id ? null : id
  }

  getFilteredProducts() {
    return this.products.filter(product => product.productTypeId === this.selectedProductTypeId)
  }
}
