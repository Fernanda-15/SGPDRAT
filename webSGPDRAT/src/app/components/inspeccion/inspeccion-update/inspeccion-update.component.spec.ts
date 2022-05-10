import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionUpdateComponent } from './inspeccion-update.component';

describe('InspeccionUpdateComponent', () => {
  let component: InspeccionUpdateComponent;
  let fixture: ComponentFixture<InspeccionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspeccionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
