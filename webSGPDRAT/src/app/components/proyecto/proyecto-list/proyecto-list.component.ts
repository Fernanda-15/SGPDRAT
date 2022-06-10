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
  public showContent: boolean = false;
  public searchText:any;
  public p:any;
  constructor(
    public _userService:UserService,
    private _proyectoService:ProyectoService
  ) {
    this.loadStorage();
    this.proyecto = new Proyecto(0,0,"","","","","","","",0)
    this.status=-1;
    this.id=0;
  }

  ngOnInit(){
   // this.loadProyectosByU();
   setTimeout(()=>this.showContent=true, 200);
   this.loadStorage();
  }

  public loadStorage(){
    this.status=-1;
    this.identity=this._userService.getIdentity();
    console.log(this.identity.sub);
      if(this.identity.rol == "ingeniero"){
       this.loadProyectosByUU(this.identity.sub);
  }else{
     this.loadProyectos();
     }
   }

   loadProyectos():void{
     this._proyectoService.getProyectos().subscribe(
      response=>{
 this.proyectos=response.data;
      },
   error=>{
     console.log("Error");
    }
 );
  }

   loadProyectosByUU(id:number):void{
   this._proyectoService.getProyectosByU(id).subscribe(
  response=>{
       this.proyectos=response.data;
       this.proyectos = this.proyectos.sort((a, b) => (a.nombre < b.nombre ? -1 : 1));
     },
     error=>{
       console.log("Error");
     }
   );
  }

  loadProyectosByU(){
    var idUser;
    this.identity=this._userService.getIdentity();
    idUser=this.identity.sub;
    if(idUser){
        this.getProyectosByU(idUser);

    }else{
      this.loadProyectos();
    }
 }


 getProyectosByU(id:number):void{
  this._proyectoService.getProyectosByU(id).subscribe(
    response=>{
      this.proyectos=response.data;
      this.proyectos = this.proyectos.sort((a, b) => (a.nombre < b.nombre ? -1 : 1));
      },
        error=>{
        console.log("Error");
        }
  )

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
          this.loadProyectosByU();
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

  buscar(form:any){
    console.log("HOLA:",this.searchText);
    if(this.searchText!=null){
      this._proyectoService.buscar(this.searchText).subscribe(
        response=>{
          if(response.status=="success"){
            console.log(response);
            this.proyectos=response.data;
            this.p=this.searchText;
            form.reset();
            if(this.proyectos.length == 0){
              this.status=3;
            }else{
              this.status=4;
            }
          }
        }
      );
    }

  }



  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }
}
