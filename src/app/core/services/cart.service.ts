import { Injectable } from '@angular/core';
import { Product } from '../models/interfaces/product';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    const existing = this.cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }
}
