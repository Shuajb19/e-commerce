import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss'
})
export class CartIconComponent {
  @Input() width: number = 24;
  @Input() height: number = 24;
  @Input() color: string = '#000000';
}
