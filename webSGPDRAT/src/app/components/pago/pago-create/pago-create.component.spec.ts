import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCreateComponent } from './pago-create.component';

describe('PagoCreateComponent', () => {
  let component: PagoCreateComponent;
  let fixture: ComponentFixture<PagoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
