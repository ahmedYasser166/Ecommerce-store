import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../../../shared/ui/product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  product!: Product;
hasError = false;

  products!: Product[];

getAllProduct() {
  this.productService.getAllProduct().subscribe({
    next: (res) => {
      this.products = res;
    },
    error: (err) => {
 console.error('An error occurred while fetching products:', err);
  this.hasError = true;
    },
  });
}


  ngOnInit(): void {
    this.getAllProduct();
  }
}
