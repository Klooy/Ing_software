import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpolicyComponent } from './sendpolicy.component';

describe('SendpolicyComponent', () => {
  let component: SendpolicyComponent;
  let fixture: ComponentFixture<SendpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
