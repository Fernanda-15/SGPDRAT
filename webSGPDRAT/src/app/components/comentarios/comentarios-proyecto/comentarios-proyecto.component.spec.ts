import { ComentariosProyectoComponent } from './comentarios-proyecto.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

describe('ComentariosProyectoComponent', () => {

    let component:ComentariosProyectoComponent;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let fixture: ComponentFixture<ComentariosProyectoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ComentariosProyectoComponent],
          providers: [ComentarioService,ProyectoService],
          imports: [HttpClientTestingModule,RouterTestingModule]
        }).compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(ComentariosProyectoComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });


});