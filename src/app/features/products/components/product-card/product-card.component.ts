import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { CartService } from '../../services/cart-service';
import {Product} from '../../models/ProductModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  productPrice: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    const savedItems = this.cartService.getCartItems();
    const savedItem = savedItems.find(item => item.id === this.product.id);
    this.productPrice = savedItem ? savedItem.price : this.cartService.generateRandomPrice();
  }

  addToCartAction(product: any) {
    this.cartService.addToCart({ ...product, price: this.productPrice });
  }
}
