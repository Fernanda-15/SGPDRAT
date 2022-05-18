import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoUpdateComponent } from './pago-update.component';

describe('PagoUpdateComponent', () => {
  let component: PagoUpdateComponent;
  let fixture: ComponentFixture<PagoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
