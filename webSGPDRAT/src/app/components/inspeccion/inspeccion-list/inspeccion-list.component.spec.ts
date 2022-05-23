import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionListComponent } from './inspeccion-list.component';

describe('InspeccionListComponent', () => {
  let component: InspeccionListComponent;
  let fixture: ComponentFixture<InspeccionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspeccionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
