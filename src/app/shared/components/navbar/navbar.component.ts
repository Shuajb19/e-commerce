import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {CartIconComponent} from '../icons/cart-icon/cart-icon.component';
import { CartService } from '../../../features/products/services/cart-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    SearchBarComponent,
    CartIconComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private cartService: CartService) {}

  getTotalItems(): number {
    return this.cartService.totalItems();
  }
}
