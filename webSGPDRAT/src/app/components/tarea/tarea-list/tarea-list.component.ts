import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import{Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.css'],
  providers: [TareaService,
    ProyectoService]
})
export class TareaListComponent implements OnInit {

  public tareas:any;
  public tarea:Tarea;
  public proyecto:Proyecto;
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


  delete(id:number):void{
    this._tareaService.deleteTarea(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadTareas(this.proyecto.id);
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

}
