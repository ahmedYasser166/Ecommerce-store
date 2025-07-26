import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
