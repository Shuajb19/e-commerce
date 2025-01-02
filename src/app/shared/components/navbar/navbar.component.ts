import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {CartIconComponent} from '../icons/cart-icon/cart-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchBarComponent, CartIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
