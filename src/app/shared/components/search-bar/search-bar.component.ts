import { Component } from '@angular/core';
import {SearchIconComponent} from '../icons/search-icon/search-icon.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchIconComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

}
