import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import {Router,ActivatedRoute} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers: [LogService,
  ProyectoService]
})

export class LogComponent implements OnInit {

  public logs:any[]=[];
  public log:Log;
  public proyecto:Proyecto;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 5;

  constructor(
    private _proyectoService:ProyectoService,
    private _logService:LogService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.log = new Log(0,0,"","","");
  }

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            console.log(this.proyecto);
            this.loadLogs(id);
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

  loadLogs(id:number):void{
    this._proyectoService.getLogs(id).subscribe(
      response=>{
          this.logs = response.data;
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
