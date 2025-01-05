import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../services/api.service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router, private cartService: CartService) {}

  getPrice() {
    return this.cartService.generateRandomPrice();
  }

  navigateToProductDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  addToCartAction(product: any) {
    this.cartService.addToCart(product);
  }
}
