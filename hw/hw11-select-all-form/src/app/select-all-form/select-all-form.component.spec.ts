import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllFormComponent } from './select-all-form.component';

describe('SelectAllFormComponent', () => {
  let component: SelectAllFormComponent;
  let fixture: ComponentFixture<SelectAllFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAllFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAllFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
