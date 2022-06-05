import { ArchivosListComponent } from './archivos-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotosService } from 'src/app/services/fotos.service';
import { ArchivosService } from 'src/app/services/archivos.service';
import { InspeccionService } from 'src/app/services/inspeccion.service';


describe('ArchivosListComponent', () => {

    let component:ArchivosListComponent;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let fixture: ComponentFixture<ArchivosListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ArchivosListComponent],
          providers: [InspeccionService, FotosService, ArchivosService],
          imports: [HttpClientTestingModule,RouterTestingModule]
        }).compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(ArchivosListComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });

    
});