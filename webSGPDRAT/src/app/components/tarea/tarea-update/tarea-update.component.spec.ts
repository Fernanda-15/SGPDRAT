import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaUpdateComponent } from './tarea-update.component';

describe('TareaUpdateComponent', () => {
  let component: TareaUpdateComponent;
  let fixture: ComponentFixture<TareaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
