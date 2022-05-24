import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ProyectoService,
    UserService]
})

export class HomeComponent implements OnInit {
  public hoyEs :any;
  public today: Date = new Date();
  public hoy = new DatePipe('en-US');
  public proyecto:Proyecto;
  public proyectos:any[]=[];
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 3;
  public identity:any;

  constructor(
    public _userService:UserService,
    private _proyectoService:ProyectoService,

  ) {
    this.proyecto = new Proyecto(0,0,"","","","","","","",0)

  }

  ngOnInit(): void {
    this.hoyEs = this.hoy.transform(Date.now(), 'dd/MM/yyyy');
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

    cambiarpagina(e:PageEvent){
      console.log(e);
      this.desde = e.pageIndex * e.pageSize;
      this.hasta = this.desde + e.pageSize;

    }




}
