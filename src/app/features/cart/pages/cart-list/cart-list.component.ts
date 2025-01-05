import { Component, Input, signal } from '@angular/core';
import { CartService } from '../../../products/services/cart-service';
import { CartItem } from '../../../products/models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {

  constructor(private cartService: CartService) {}

  couponCode = signal('');
  showCouponError = signal(false);
  showCouponSuccess = signal(false);

  getCartItems() {
    return this.cartService.getCartItems();
  }

  trackById(index: number, item: CartItem): number {
    return item.id;
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
        this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  subtotal() {
    return this.cartService.subtotal();
  }

  calculateTotal() {
    return this.cartService.total();
  }

  calculateTVSH() {
    return this.cartService.tvsh();
  }

  calculateDiscount() {
    return this.cartService.discount();
  }

  applyCoupon(code: string) {
    const isValid = this.cartService.applyDiscount(code);
    this.showCouponError.set(!isValid);
    this.showCouponSuccess.set(isValid);
  }

  clearCart() {
    this.couponCode.set('');
    this.showCouponError.set(false);
    this.showCouponSuccess.set(false);
    this.cartService.clearCart();
  }
}
