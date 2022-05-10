import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionCreateComponent } from './inspeccion-create.component';

describe('InspeccionCreateComponent', () => {
  let component: InspeccionCreateComponent;
  let fixture: ComponentFixture<InspeccionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspeccionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
