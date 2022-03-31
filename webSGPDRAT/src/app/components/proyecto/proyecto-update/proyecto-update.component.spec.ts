import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoUpdateComponent } from './proyecto-update.component';

describe('ProyectoUpdateComponent', () => {
  let component: ProyectoUpdateComponent;
  let fixture: ComponentFixture<ProyectoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
