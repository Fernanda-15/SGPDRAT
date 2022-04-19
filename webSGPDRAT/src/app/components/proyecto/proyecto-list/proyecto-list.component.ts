import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import{global} from '../../../services/global';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css'],
  providers:[ProyectoService]
})
export class ProyectoListComponent implements OnInit {

  public proyecto:Proyecto;
  public proyectos:any;

  constructor(
    private _proyectoService:ProyectoService
  ) { 
    this.proyecto = new Proyecto(0,0,"","","","","","","",0)
  }

  ngOnInit(): void {
    this.loadProyectos();
  }

  loadProyectos():void{
    this._proyectoService.getProyectos().subscribe(
      response=>{
        console.log(response);
        this.proyectos=response.data;
      },
      error=>{
        this.proyectos=null;
        console.log("Error");
      }
    );
  }


  delete(id:number):void{
    this._proyectoService.deleteProyecto(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadProyectos();
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
