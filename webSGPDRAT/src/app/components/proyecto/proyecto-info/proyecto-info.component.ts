import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-proyecto-info',
  templateUrl: './proyecto-info.component.html',
  styleUrls: ['./proyecto-info.component.css'],
  providers: [TareaService,
            ProyectoService,
          UserService]
})
export class ProyectoInfoComponent implements OnInit {

  public proyecto:Proyecto;
  private user:User;
  public userName:string;
  public tareas:any;
  constructor(
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _userService:UserService,
    private _route:ActivatedRoute, 
    private _router:Router,
  ) { 
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.user = new User(0,"","","","","","","",);
    this.userName = "";
  }

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            console.log(this.proyecto);
            this.getUserName();
            this.loadTareas(this.proyecto.id); 
            console.log(this.tareas);
          }else{
            console.log('AQUI');
            //this._router.navigate(['']);
          }
        },
        error=>{
          console.log(error);
         //this._router.navigate(['']); 
        }
      );
    });
  }

  getUserName(){
      this._userService.getUser(this.proyecto.user_id).subscribe(
        response=>{
          if(response.status=='success'){
            this.user=response.data;
            console.log(this.user);
            this.userName = this.user.nombre;
          }else{
            console.log('AQUI');
            //this._router.navigate(['']);
          }
        },
        error=>{
          console.log(error);
         //this._router.navigate(['']); 
        }
      );
  }

  loadTareas(id:number):void{
    this._proyectoService.getTareas(id).subscribe(
      response=>{
        console.log(response.data);
          this.tareas = response.data;
      },
      error=>{
        console.log(error);
      }
    );
  }

}
