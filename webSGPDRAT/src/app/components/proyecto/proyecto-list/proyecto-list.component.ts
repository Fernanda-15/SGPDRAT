import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import { UserService } from '../../../services/user.service';
import{global} from '../../../services/global';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.css'],
  providers:[ProyectoService,
              UserService]
})
export class ProyectoListComponent implements OnInit {

  public proyecto:Proyecto;
  public proyectos:any[]=[];
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 3;
  public status:number;
  public tareas:any;
  public id:number;
  public identity:any;

  constructor(
    public _userService:UserService,
    private _proyectoService:ProyectoService
  ) {
    this.proyecto = new Proyecto(0,0,"","","","","","","",0)
    this.status=-1;
    this.id=0;
  }

  ngOnInit(): void {
    this.loadStorage();
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
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


  getTareas():void{
  this._proyectoService.getTareas(this.id).subscribe(
     response=>{
       if(response.status=="success"){
          this.tareas = response.data;
          this.delete();
          console.log(this.tareas);
        }else{
          this.status = 2;
          console.log(response);
        }
      },
      error=>{
        this.status = 2;
        console.log(error);
      }
    );
  }

  asigna_id(id:number):void{
    this.id = id;
    this.getTareas();
  }
 
  delete():void{
  let counter=timer(5000);
  if(this.tareas.length == 0){
    this._proyectoService.deleteProyecto(this.id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadProyectos();
          this.status = 0;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }
        else{
          this.status = 2;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
          console.log(response);
        }

      },
      error=>{
        this.status = 2;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        console.log(error);
      }
    );

  }else{
    this.status=1;
    counter.subscribe(n=>{
      console.log(n);
      this.status=-1;
    });
  }
      
  
     
  }


  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }
}
