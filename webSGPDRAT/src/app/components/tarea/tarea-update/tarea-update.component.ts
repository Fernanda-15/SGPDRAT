import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import {Tarea} from '../../../models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
import{timer} from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tarea-update',
  templateUrl: './tarea-update.component.html',
  styleUrls: ['./tarea-update.component.css'],
  providers: [TareaService, ProyectoService,UserService,LogService]
})
export class TareaUpdateComponent implements OnInit {
  
  public proyecto:Proyecto;
  public tarea:any;
  public status: any;
  public reset=false;
  public identity:any;
  private log:Log;

  constructor(
    private _tareaService:TareaService,
    private _proyectoService: ProyectoService, 
    private _router:Router,
    private _route:ActivatedRoute,
    private _userService: UserService,
    private _logService: LogService
  ) { 
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.tarea=new Tarea(0,0,0,"",0,0,"","");
    this.status=-1;
    this.log = new Log(0,0,"","","");
  }

  ngOnInit(): void {
    this.loadStorage();
    this.reset=false;
    this.getTarea();
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
  }

  getTarea():void{

    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._tareaService.getTarea(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.tarea=response.data;
            this.getProyecto(this.tarea.proyecto_id);
          }else{
            this._router.navigate(['']);
          }
        },
        error=>{
         this._router.navigate(['']); 
        }
      );
    });
  }

  insertLogUpdate(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se ha actualizado la tarea "+texto,"");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response=>{
      },
      error=>{
        console.log(error);
      }
    );
  }


  getProyecto(id:number):void{
    this._proyectoService.getProyecto(id).subscribe(
      response=>{
        if(response.status=='success'){
          this.proyecto=response.data;
        }else{
          this._router.navigate(['']);
        }
      },
      error=>{
       this._router.navigate(['']); 
      }
    );
  }
  onSubmit(form:any):void{
    console.log(this.proyecto.fecha_inicio);
    console.log(this.proyecto.fecha_final);
    let counter=timer(5000);
    if(this.tarea.fecha_final >= this.tarea.fecha_inicio){
      if((this.tarea.fecha_inicio >= this.proyecto.fecha_inicio) && (this.tarea.fecha_inicio <= this.proyecto.fecha_final)){ //FECHA INICIO DE TAREA CON EL PROYECTO
        if((this.tarea.fecha_final <= this.proyecto.fecha_final) && (this.tarea.fecha_final >= this.proyecto.fecha_inicio)){ //FECHA FINAL DE TAREA CON EL PROYECTO
        
          this._tareaService.update(this.tarea).subscribe(
            response=>{
          if(response.code==200){
            this.insertLogUpdate(this.tarea.proyecto_id,"Numero "+this.tarea.numero+": "+this.tarea.descripcion+ " | Peso: "+this.tarea.peso + " | Avance: "+this.tarea.avance);
            this.status=-1;
            this._router.navigate(['/tarea-list',this.tarea.proyecto_id]);
            }else{
              this.status=0;
              this.reset=true;
            }
            },
      
            error=>{
              console.log(error);
              this.status=0;
            }
          );
        
        }else{
          this.status=3;
          counter.subscribe(n=>{
          console.log(n);
          this.status=-1;
        });
        }
      }else{
        this.status=2;
        counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
      }
    }else{
      this.status=1;
      counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
    }
    

  }

}
