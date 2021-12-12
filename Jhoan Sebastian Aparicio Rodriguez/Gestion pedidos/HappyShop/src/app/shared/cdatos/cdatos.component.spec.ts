import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdatosComponent } from './cdatos.component';

describe('CdatosComponent', () => {
  let component: CdatosComponent;
  let fixture: ComponentFixture<CdatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
