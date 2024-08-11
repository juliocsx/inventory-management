import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product-type.service';

@Component({
  selector: 'app-product-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.css'
})
export class ProductTypeComponent implements OnInit{
  productTypes: any[] = [];

  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.productTypeService.getProductTypes().subscribe(response => {
      this.productTypes = response.data;
    });
  }
}
