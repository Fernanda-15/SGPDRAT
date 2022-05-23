import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';

@Component({
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.css'],
  providers: [TareaService,
    ProyectoService]
})
export class TareaListComponent implements OnInit {

  public tareas: any[]=[];
  public tarea:Tarea;
  public proyecto:Proyecto;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 5;
  public status:number;
  constructor(
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _route:ActivatedRoute,
    private _router:Router,
  ) {
    this.status=-1;
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.tarea = new Tarea(0,0,0,"",0,0,"","");
  }

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.loadTareas(id);
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

  loadTareas(id:number):void{
    this._proyectoService.getTareas(id).subscribe(
      response=>{
          this.tareas = response.data;
      },
      error=>{
        console.log(error);
      }
    );
  }


  delete(id:number):void{
  let counter=timer(5000);
    this._tareaService.deleteTarea(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadTareas(this.proyecto.id);
          this.status=0;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }
        else{
          console.log(response);
        }

      },
      error=>{
        console.log(error);
      }
    );
  }

  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }

  listo():void{
  let counter=timer(5000);
  let total:number=0;

    for(let i in this.tareas){
       total= total + (this.tareas[i].peso);
     }

    if(total != 100){
       this.status=1;
       counter.subscribe(n=>{
         console.log(n);
         this.status=-1;
       });
    }else{
      this._router.navigate(['/proyecto-list']);
   }

  }




}

