import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../../services/api.service';
import { CartService } from '../../services/cart-service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: CartService;

  const mockProducts = {
    products: [
      {
        code: '123',
        generic_name_en: 'Test Product',
        brands: 'Test Brand',
        image_url: 'test.jpg'
      }
    ],
    count: 1,
    page: 1,
    page_size: 20
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    productServiceSpy.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [
        ProductsListComponent,
        ProductCardComponent
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        CartService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load initial products', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(productService.getProducts).toHaveBeenCalledWith(1, 20);
    expect(component.products().length).toBe(1);
  }));

  it('should update displayed products when scrolling', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    // Here we scroll the window
    const scrollEvent = new Event('scroll');
    Object.defineProperty(window, 'innerHeight', { value: 500 });
    Object.defineProperty(window, 'scrollY', { value: 1000 });
    Object.defineProperty(document.body, 'offsetHeight', { value: 1400 });

    window.dispatchEvent(scrollEvent);
    tick(100);
    fixture.detectChanges();

    expect(component.isLoading()).toBeFalsy();
  }));

  it('should not load more products when already loading', fakeAsync(() => {
    component.isLoading.set(true);
    fixture.detectChanges();

    window.dispatchEvent(new Event('scroll'));
    tick(100);

    expect(productService.getProducts).toHaveBeenCalledTimes(0);
  }));

  it('should show alert message when item is added to cart', fakeAsync(() => {
    fixture.detectChanges();
    component.cartService.alertMessage.set(true);
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css('.alert-message'));
    expect(alertElement).toBeTruthy();

    tick(2000);
    fixture.detectChanges();
    expect(component.cartService.alertMessage()).toBeFalse();
  }));
});
