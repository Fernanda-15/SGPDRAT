import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosProyectoComponent } from './comentarios-proyecto.component';

describe('ComentariosProyectoComponent', () => {
  let component: ComentariosProyectoComponent;
  let fixture: ComponentFixture<ComentariosProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
