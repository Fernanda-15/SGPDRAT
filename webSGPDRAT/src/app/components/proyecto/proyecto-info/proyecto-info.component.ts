import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Pago } from 'src/app/models/pago';


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
  public user_id:number;
  public userName:string;
  public tareas:any;
  public proyecto_id:string;
  public tareasEjecutadas:number;
  public tareasTotal:number;
  public avanceObra:number;
  public pagos:any;
  public porcentajePagado:number;
  constructor(
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _userService:UserService,
    private _route:ActivatedRoute, 
    private _router:Router,
  ) { 
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.user = new User(0,"","","","","","","","");
    this.userName = "";
    this.proyecto_id = "";
    this.tareasEjecutadas = 0;
    this.tareasTotal = 0;
    this.avanceObra = 0;
    this.porcentajePagado = 0;
    this.user_id = 0;
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
            this.proyecto_id = this.proyecto.id.toString();
            console.log("ID PROYECTO "+this.proyecto_id);
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
            this.user_id = this.user.id;
            console.log(this.user_id);
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
          this.tareas.forEach((t:any) => {
            this.tareasTotal +=1;
            if(t.avance == 100){
              this.tareasEjecutadas += 1;
            }
          })
          this.avanceObra = (this.tareasEjecutadas/this.tareasTotal)*100;
      },
      error=>{
        console.log(error);
      }
    );
  }

  loadPorcentajePagado(id:number){
    this._proyectoService.getPagos(id).subscribe(
      response=>{
        console.log(response.data);
          let pagado = 0;
          this.pagos = response.data;
          this.pagos.forEach((p:any) => {
          pagado = pagado + p.monto;
          })
          this.porcentajePagado = (this.pagos/this.proyecto.monto_adjudicado)*100;
      },
      error=>{
        console.log(error);
      }
    );
  }

}
