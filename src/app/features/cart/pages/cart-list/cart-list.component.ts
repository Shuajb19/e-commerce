import { Component } from '@angular/core';
import { CartService } from '../../../products/services/cart-service';
import { CartItem } from '../../../products/models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {

  constructor(private cartService: CartService) {}

  getCartItems() {
    return this.cartService.getCartItems();
  }

  calculateTotal() {
    return this.cartService.calculateTotal();
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
}
