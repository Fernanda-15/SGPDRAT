import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasAvanceComponent } from './tareas-avance.component';

describe('TareasAvanceComponent', () => {
  let component: TareasAvanceComponent;
  let fixture: ComponentFixture<TareasAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
