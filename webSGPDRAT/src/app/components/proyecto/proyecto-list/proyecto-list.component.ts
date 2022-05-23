import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import{global} from '../../../services/global';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css'],
  providers:[ProyectoService]
})
export class ProyectoListComponent implements OnInit {

  public proyecto:Proyecto;
  public proyectos:any[]=[];
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 3;


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


  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }
}
