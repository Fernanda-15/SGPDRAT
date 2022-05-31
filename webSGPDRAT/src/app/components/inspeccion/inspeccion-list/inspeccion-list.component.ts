import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Inspeccion } from 'src/app/models/inspeccion';
import{Router,ActivatedRoute} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inspeccion-list',
  templateUrl: './inspeccion-list.component.html',
  styleUrls: ['./inspeccion-list.component.css'],
  providers: [InspeccionService,
    ProyectoService,
    LogService,
  UserService]
})
export class InspeccionListComponent implements OnInit {

  public inspecciones:any[]=[];
  public inspeccion:Inspeccion;
  public proyecto:Proyecto;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 3;
  public status:number;
  private log:Log;
  public identity:any;

  constructor(
    private _proyectoService:ProyectoService,
    private _inspeccionService:InspeccionService,
    private _logService: LogService,
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router,
  ) { 
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.inspeccion = new Inspeccion(0,0,0,0,"","","",0,0,0);
    this.status = -1;
    this.log = new Log(0,0,"","","");
  }

  ngOnInit(): void {
    this.loadStorage();
    this.getProyecto();
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
  }

  
  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.loadInspecciones(id);
          }
        },
        error=>{
          console.log(error);
          this._router.navigate(['']);
        }
      );
    });
  }

  
  insertLogDelete(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se ha eliminado la inspeccion "+texto,"");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response=>{
      },
      error=>{
        console.log(error);
      }
    );
  }


  loadInspecciones(id:number):void{
    this._proyectoService.getInspecciones(id).subscribe(
      response=>{
          this.inspecciones = response.data;
          console.log(this.inspecciones);
      },
      error=>{
        console.log(error);
      }
    );
  }

  delete(id:number):void{
    let counter=timer(5000);
    this._inspeccionService.deleteInspeccion(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.insertLogDelete(this.inspeccion.proyecto_id,id.toString());
          this.loadInspecciones(this.proyecto.id);
          this.status = 0;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }
        else{
          this.status=1;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
          console.log(response);
        }

      },
      error=>{
        this.status = 1;
        counter.subscribe(n=>{
          console.log(n);
          this.status=-1;
        });
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

