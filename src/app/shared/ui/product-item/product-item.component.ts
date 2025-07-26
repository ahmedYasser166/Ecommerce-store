import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../core/models/interfaces/product';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, RouterModule], // ✅ ضيف RouterModule هنا

  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  standalone: true
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
 private readonly toastr = inject(ToastrService)
   showToastr() {
    this.toastr.success('Product added successfully', '' , {
      timeOut:1500
    });
  }
  filledStars: number[] = [];
  emptyStars: number[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    const rating = Math.round(this.product.rating?.rate || 0);
    this.filledStars = Array(rating).fill(0);
    this.emptyStars = Array(5 - rating).fill(0);
  }

addToCart() {
  this.cartService.addToCart(this.product);
  this.showToastr()
}

  goToDetails(event: Event): void {
    this.router.navigate(['/products', this.product.id]);
  }
}
