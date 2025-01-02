import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../services/api.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  // private router = inject(Router);
  constructor(private router: Router) {}


  navigateToProductDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  addToCartAction(product: any) {
    // this.cartService.addToCart(product);
  }
}
