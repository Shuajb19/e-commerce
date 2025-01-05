import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        CartService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 123,
      code: '123',
      generic_name_en: 'Test Product',
      brands: 'Test Brand',
      image_url: 'test.jpg',
      price: 10
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
