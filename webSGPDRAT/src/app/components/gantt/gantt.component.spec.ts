import { GanttComponent } from './gantt.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Validators, FormBuilder } from "@angular/forms";

describe('GanttComponent', () => {

    let component:GanttComponent;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let fixture: ComponentFixture<GanttComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [GanttComponent],
          providers: [TareaService,ProyectoService,FormBuilder],
          imports: [HttpClientTestingModule,RouterTestingModule,FormsModule]
        }).compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(GanttComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });


});