import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorModule } from './components/error/error.module';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { ProyectoCreateComponent } from './components/proyecto/proyecto-create/proyecto-create.component';
import { ProyectoListComponent } from './components/proyecto/proyecto-list/proyecto-list.component';
import { ProyectoUpdateComponent } from './components/proyecto/proyecto-update/proyecto-update.component';
import { TareaCreateComponent } from './components/tarea/tarea-create/tarea-create.component';
import { TareaUpdateComponent } from './components/tarea/tarea-update/tarea-update.component';
import { TareaListComponent } from './components/tarea/tarea-list/tarea-list.component';
import { ProyectoInfoComponent } from './components/proyecto/proyecto-info/proyecto-info.component';
import { LogComponent } from './components/log/log.component';
import { ComentariosProyectoComponent } from './components/comentarios/comentarios-proyecto/comentarios-proyecto.component';
import {CalendarModule} from './components/calendar/calendar.module';
import { PagoCreateComponent } from './components/pago/pago-create/pago-create.component';
import { PagoListComponent } from './components/pago/pago-list/pago-list.component';
import { PagoUpdateComponent } from './components/pago/pago-update/pago-update.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InspeccionCreateComponent } from './components/inspeccion/inspeccion-create/inspeccion-create.component';
import { InspeccionUpdateComponent } from './components/inspeccion/inspeccion-update/inspeccion-update.component';
import { InspeccionListComponent } from './components/inspeccion/inspeccion-list/inspeccion-list.component';
import { GanttModule } from './components/gantt/gantt.module';
import { TareasAvanceComponent } from './components/tarea/tareas-avance/tareas-avance.component';
import { AboutComponent } from './components/about/about.component';
import { ArchivosListComponent } from './components/archivos/archivos-list/archivos-list.component';
import { Validators, FormBuilder } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRegisterComponent,
    UserListComponent,
    UserUpdateComponent,
    ProyectoCreateComponent,
    ProyectoListComponent,
    ProyectoUpdateComponent,
    TareaCreateComponent,
    TareaUpdateComponent,
    TareaListComponent,
    ProyectoInfoComponent,
    LogComponent,
    ComentariosProyectoComponent,
    PagoCreateComponent,
    PagoListComponent,
    PagoUpdateComponent,
    InspeccionCreateComponent,
    InspeccionUpdateComponent,
    InspeccionListComponent,
    TareasAvanceComponent,
    AboutComponent,
    ArchivosListComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    GanttModule,
    ErrorModule,
    AngularFileUploaderModule,
    MatInputModule
  ],
  providers: [
    appRoutingProviders,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
