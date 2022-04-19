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
import {ProyectoUpdateComponent} from './components/proyecto/proyecto-update/proyecto-update.component';
import { ErrorComponent } from "./components/error/error.component";



//DEFINIR RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio',component:HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'user-register',component:UserRegisterComponent},
    {path: 'user-list',component:UserListComponent},
    {path: 'user-update/:id',component:UserUpdateComponent},
    {path: 'proyecto-create', component:ProyectoCreateComponent},
    {path: 'proyecto-list', component:ProyectoListComponent},
    {path: 'proyecto-update/:id', component:ProyectoUpdateComponent},
    {path: '**', component: ErrorComponent}
];

//EXPORTAR CONFIG
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
