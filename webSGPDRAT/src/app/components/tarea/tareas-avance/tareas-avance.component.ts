import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tarea } from 'src/app/models/tarea';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';

@Component({
  selector: 'app-tareas-avance',
  templateUrl: './tareas-avance.component.html',
  styleUrls: ['./tareas-avance.component.css'],
  providers: [TareaService,
    ProyectoService]
})
export class TareasAvanceComponent implements OnInit {

  public tareas: any[]=[];
  public tarea:Tarea;
  public proyecto:Proyecto;
  public desde:number = 0;
  public hasta:number = 3;
  constructor(
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _route:ActivatedRoute,
    private _router:Router,
  ) { 
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

  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }
}

