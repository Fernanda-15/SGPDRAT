//IMPORTS NECESARIOS
import { ModuleWithProviders } from "@angular/core";
import {Routes,RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent} from './components/home/home.component';
import {UserRegisterComponent} from './components/user/user-register/user-register.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {UserUpdateComponent} from './components/user/user-update/user-update.component';
import {ProyectoCreateComponent} from './components/proyecto/proyecto-create/proyecto-create.component';
import {ProyectoListComponent} from './components/proyecto/proyecto-list/proyecto-list.component';
import {ProyectoInfoComponent} from './components/proyecto/proyecto-info/proyecto-info.component';
import {ProyectoUpdateComponent} from './components/proyecto/proyecto-update/proyecto-update.component';
import {TareaListComponent} from './components/tarea/tarea-list/tarea-list.component';
import {TareaCreateComponent} from './components/tarea/tarea-create/tarea-create.component';
import {TareaUpdateComponent} from './components/tarea/tarea-update/tarea-update.component';
import { ErrorComponent } from "./components/error/error.component";
import { LogComponent } from "./components/log/log.component";
import {ComentariosProyectoComponent} from './components/comentarios/comentarios-proyecto/comentarios-proyecto.component';
import {PagoCreateComponent} from './components/pago/pago-create/pago-create.component';
import {PagoListComponent} from './components/pago/pago-list/pago-list.component';
import {PagoUpdateComponent} from './components/pago/pago-update/pago-update.component';
import {InspeccionCreateComponent} from './components/inspeccion/inspeccion-create/inspeccion-create.component';
import {InspeccionUpdateComponent} from './components/inspeccion/inspeccion-update/inspeccion-update.component';
import {InspeccionListComponent} from './components/inspeccion/inspeccion-list/inspeccion-list.component';


//DEFINIR RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio/:id',component:HomeComponent},
    {path: 'login',component:LoginComponent},
    {path: 'logout/:sure',component:LoginComponent},
    {path: 'user-register',component:UserRegisterComponent},
    {path: 'user-list',component:UserListComponent},
    {path: 'user-update/:id',component:UserUpdateComponent},
    {path: 'proyecto-create', component:ProyectoCreateComponent},
    {path: 'proyecto-list', component:ProyectoListComponent},
    {path: 'proyecto-info/:id', component:ProyectoInfoComponent},
    {path: 'proyecto-update/:id', component:ProyectoUpdateComponent},
    {path: 'tarea-list/:id', component:TareaListComponent},
    {path: 'tarea-create/:id', component:TareaCreateComponent},
    {path: 'tarea-update/:id', component:TareaUpdateComponent},
    {path: 'log-list/:id', component:LogComponent},
    {path: 'comentarioproyecto-list/:id', component:ComentariosProyectoComponent},
    {path: 'pago-create/:id', component:PagoCreateComponent},
    {path: 'pago-list/:id', component:PagoListComponent},
    {path: 'pago-update/:id', component:PagoUpdateComponent},
    {path: 'inspeccion-create/:id', component:InspeccionCreateComponent},
    {path: 'inspeccion-update/:id', component:InspeccionUpdateComponent},
    {path: 'inspeccion-list/:id', component:InspeccionListComponent},
    {path: '**', component: ErrorComponent}
];

//EXPORTAR CONFIG
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
