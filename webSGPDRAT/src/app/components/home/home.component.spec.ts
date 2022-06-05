import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from 'src/app/services/user.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

describe('HomeComponent', () => {

    let component:HomeComponent;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [HomeComponent],
          providers: [UserService,ProyectoService],
          imports: [HttpClientTestingModule,RouterTestingModule]
        }).compileComponents();


        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });


});