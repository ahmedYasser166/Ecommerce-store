import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../../../shared/ui/product-item/product-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm: string = '';
  sortOption: string = '';
  hasError: boolean = false;

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = [...res];
      },
      error: () => {
        this.hasError = true;
      },
    });
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
    this.applySorting();
  }

  onSortChange() {
    this.applySorting();
  }

  applySorting() {
    if (this.sortOption === 'lowToHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'highToLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
  trackByFn(index: number, product: Product) {
    return product.id;
  }
}
