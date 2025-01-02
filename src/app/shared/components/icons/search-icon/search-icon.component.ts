import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-search-icon',
  standalone: true,
  imports: [],
  templateUrl: './search-icon.component.html',
  styleUrl: './search-icon.component.scss'
})
export class SearchIconComponent {
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() color: string = '#000000';
}
