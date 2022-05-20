import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import {Tarea} from '../../../models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
import{timer} from 'rxjs';

@Component({
  selector: 'app-tarea-update',
  templateUrl: './tarea-update.component.html',
  styleUrls: ['./tarea-update.component.css'],
  providers: [TareaService, ProyectoService]
})
export class TareaUpdateComponent implements OnInit {
  
  public proyecto:Proyecto;
  public tarea:any;
  public status: any;
  public reset=false;

  constructor(
    private _tareaService:TareaService,
    private _proyectoService: ProyectoService, 
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.tarea=new Tarea(0,0,0,"",0,0,"","");
    this.status=-1;
  }

  ngOnInit(): void {
    this.reset=false;
    this.getTarea();
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
            this.status=-1;
            this._router.navigate(['/proyecto-list']);
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
