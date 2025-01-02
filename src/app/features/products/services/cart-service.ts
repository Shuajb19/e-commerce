import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  totalAmount = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }
  }

  private generateRandomPrice(): number {
    return Number((Math.random() * (100 - 10) + 10).toFixed(2));
  }

  addToCart(item: CartItem): void {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.id === item.id);

      if (existingItem) {
        return items.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      const newItem: CartItem = {
        id: item.id,
        generic_name_en: item.generic_name_en,
        brands: item.brands,
        price: this.generateRandomPrice(),
        quantity: 1
      };

      return [...items, newItem];
    });

    this.updateStorage();
  }

  getCartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(itemId: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== itemId)
    );
    this.updateStorage();
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    this.updateStorage();
  }

  calculateTotal(): number {
    return this.getCartItems().reduce((total, item) =>
      total + (item.price * item.quantity), 0
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.updateStorage();
  }

  updateStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
}
