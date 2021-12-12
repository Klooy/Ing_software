import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypolicyComponent } from './paypolicy.component';

describe('PaypolicyComponent', () => {
  let component: PaypolicyComponent;
  let fixture: ComponentFixture<PaypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
