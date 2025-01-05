import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  discountPercentage = signal(0);
  alertMessage = signal(false);

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  total = computed(() => {
    const subtotalAmount = this.subtotal();
    const tvshAmount = this.tvsh();
    const discountAmount = (subtotalAmount * this.discountPercentage()) / 100;
    return subtotalAmount + tvshAmount - discountAmount;
  });

  tvsh = computed(() => 
    this.cartItems().reduce((total, item) =>
      total + (item.price * item.quantity * 0.18), 0
    )
  );

  discount = computed(() => {
    const subtotalAmount = this.subtotal();
    return (subtotalAmount * this.discountPercentage()) / 100;
  });

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }
  }

  generateRandomPrice(): number {
    return Number((Math.random() * (100 - 10) + 10).toFixed(2));
  }

  addToCart(item: CartItem): void {
    this.alertMessage.set(true);
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
        image_url: item.image_url,
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

  clearCart(): void {
    this.cartItems.set([]);
    this.updateStorage();
  }

  updateStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  applyDiscount(code: string): boolean {
    if (code === 'KODELABS10') {
      this.discountPercentage.set(10);
      return true;
    }
    this.discountPercentage.set(0);
    return false;
  }
}
