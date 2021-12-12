import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandcoditionsComponent } from './termsandcoditions.component';

describe('TermsandcoditionsComponent', () => {
  let component: TermsandcoditionsComponent;
  let fixture: ComponentFixture<TermsandcoditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsandcoditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandcoditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
