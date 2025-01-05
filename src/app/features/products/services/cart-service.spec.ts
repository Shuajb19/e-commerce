import { TestBed } from '@angular/core/testing';
import { CartService } from './cart-service';
import { CartItem } from '../models/model';

describe('CartService', () => {
  let service: CartService;
  let mockCartItem: CartItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    
    localStorage.clear();
    
    mockCartItem = {
      id: 1,
      generic_name_en: 'Test Product',
      brands: 'Test Brand',
      price: 50,
      quantity: 1,
      image_url: 'test.jpg'
    };

    service = TestBed.inject(CartService);
    service.cartItems.set([]);
    
    spyOn(service, 'generateRandomPrice').and.returnValue(50);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Cart Operations', () => {
    it('should add item to cart', () => {
      service.addToCart(mockCartItem);
      expect(service.cartItems().length).toBe(1);
      expect(service.totalItems()).toBe(1);
    });

    it('should increase quantity when adding same item', () => {
      service.addToCart(mockCartItem);
      service.addToCart({...mockCartItem});
      
      const cartItem = service.cartItems()[0];
      expect(cartItem.quantity).toBe(2);
    });

    it('should update quantity', () => {
      service.addToCart(mockCartItem);
      service.updateQuantity(mockCartItem.id, 3);
      expect(service.cartItems()[0].quantity).toBe(3);
    });

    it('should remove item from cart', () => {
      service.addToCart(mockCartItem);
      service.removeFromCart(mockCartItem.id);
      expect(service.cartItems().length).toBe(0);
    });

    it('should clear cart', () => {
      service.addToCart(mockCartItem);
      service.clearCart();
      expect(service.cartItems().length).toBe(0);
    });
  });

  describe('Cart Calculations', () => {
    beforeEach(() => {
      service.cartItems.set([]);
      service.addToCart(mockCartItem);
    });

    it('should calculate subtotal correctly', () => {
      expect(service.subtotal()).toBe(50);
    });

    it('should calculate TVSH (18%) correctly', () => {
      const expectedTVSH = 50 * 0.18;
      expect(service.tvsh()).toBeCloseTo(expectedTVSH, 2);
    });

    it('should calculate total with discount', () => {
      service.applyDiscount('KODELABS10');
      const expectedTotal = 50 + (50 * 0.18) - (50 * 0.1);
      expect(service.total()).toBeCloseTo(expectedTotal, 2);
    });
  });

  describe('Discount Management', () => {
    it('should apply valid discount code', () => {
      const result = service.applyDiscount('KODELABS10');
      expect(result).toBe(true);
      expect(service.discountPercentage()).toBe(10);
    });

    it('should reject invalid discount code', () => {
      const result = service.applyDiscount('INVALID');
      expect(result).toBe(false);
      expect(service.discountPercentage()).toBe(0);
    });
  });

  describe('Local Storage Integration', () => {
    it('should persist cart items to localStorage', () => {
      service.addToCart(mockCartItem);
      const storedItems = JSON.parse(localStorage.getItem('cart') || '[]');
      expect(storedItems.length).toBe(1);
      expect(storedItems[0].id).toBe(mockCartItem.id);
    });

    it('should load cart items from localStorage on initialization', () => {
      TestBed.resetTestingModule();
      
      localStorage.setItem('cart', JSON.stringify([mockCartItem]));
      
      TestBed.configureTestingModule({
        providers: [CartService]
      });
      
      const newService = TestBed.inject(CartService);
      
      expect(newService.cartItems().length).toBe(1);
      expect(newService.cartItems()[0].id).toBe(mockCartItem.id);
    });
  });
}); 