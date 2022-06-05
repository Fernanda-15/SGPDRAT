import { CalendarComponent } from './calendar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DataService} from "../calendar/data.service";
import {ProyectoService} from "src/app/services/proyecto.service"
import {TareaService} from "src/app/services/tarea.service"


describe('CalendarComponent', () => {

    let component:CalendarComponent;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let fixture: ComponentFixture<CalendarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [CalendarComponent],
          providers: [DataService,ProyectoService,TareaService],
          imports: [HttpClientTestingModule,RouterTestingModule]
        }).compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });


});