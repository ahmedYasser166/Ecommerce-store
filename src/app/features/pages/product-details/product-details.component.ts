import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../../../core/models/interfaces/product';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  isLoading = true;
  errorMsg = '';
  filledStars: number[] = [];
  emptyStars: number[] = [];
  private readonly toastr = inject(ToastrService);
  showToastr() {
    this.toastr.success('Product added successfully', '', {
      timeOut: 1500,
    });
  }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  addToCart() {
    this.cartService.addToCart(this.product);
    this.showToastr();
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;

        const rate = Math.round(res.rating?.rate || 0);
        this.filledStars = Array(rate).fill(0);
        this.emptyStars = Array(5 - rate).fill(0);

        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'error in product';
        this.isLoading = false;
      },
    });
  }
}
