import {Component, HostListener, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {Product, ProductService} from '../../services/api.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products = signal<Product[]>([]);
  displayedProducts = signal<Product[]>([]);
  page = signal(1);
  pageSize = signal(20);
  currentIndex = signal(0);
  productsPerBatch = signal(10);
  totalProducts = signal(300);
  isLoading = signal(false);

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.productService.getProducts(this.page(), this.pageSize()).subscribe({
      next: (data) => {
        this.products.update(current => [...current, ...data.products]);
        if (this.displayedProducts().length === 0 || this.displayedProducts().length < this.totalProducts()) {
          this.loadNextBatch();
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading.set(false);
      }
    });
  }

  loadNextBatch() {
    if (this.currentIndex() >= this.products().length) {
      if (this.products().length < this.totalProducts()) {
        this.page.update(p => p + 1);
        this.getProducts();
        return;
      }
      return;
    }

    const nextBatch = this.products().slice(
      this.currentIndex(),
      this.currentIndex() + this.productsPerBatch()
    );
    this.displayedProducts.update(current => [...current, ...nextBatch]);
    this.currentIndex.update(current => current + this.productsPerBatch());
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isLoading()) return;

    const bottomOfWindow = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottomOfWindow) {
      this.loadNextBatch();
    }
  }
}
