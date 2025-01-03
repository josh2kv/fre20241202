import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistSectionComponent } from './wishlist-section.component';

describe('WishlistSectionComponent', () => {
  let component: WishlistSectionComponent;
  let fixture: ComponentFixture<WishlistSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishlistSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
