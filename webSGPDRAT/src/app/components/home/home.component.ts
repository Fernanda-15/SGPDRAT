import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';
import{Router,ActivatedRoute} from '@angular/router';


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
  public proyectos:Array<Proyecto>;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 3;
  public identity:any;
  public user:any;
  private token:any;

  constructor(
    public _userService:UserService,
    private _proyectoService:ProyectoService,
    private _route:ActivatedRoute,
    private _router:Router

  ) { this.loadStorage();
    this.proyecto = new Proyecto(0,0,"","","","","","","",0)
    this.proyectos=[];
  }

  ngOnInit(){
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') == 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
   this.loadProyectosByU();
  this.hoyEs = this.hoy.transform(Date.now(), 'dd/MM/yyyy');
  }


  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

    getUser(){
      this._route.params.subscribe(params=>{

        let id=params['sure'];
        console.log(id);
        this._userService.getUser(id).subscribe(
          response=>{
            if(response.status=='success'){
              this.user=response.data;

            }
          },
          error=>{
            console.log(error);
          }
        );
      });
    }

    loadProyectos(){
      this._proyectoService.getProyectos().subscribe(
          response=>{
        this.proyectos=response.data;
        console.log(response.data);
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
      console.log(idUser);
      if(idUser){
        console.log("hola");
      this.getProyectosByU(idUser);
      }else{
        console.log(idUser);
        this.loadProyectos();
      }
   }



    getProyectosByU(id:number):void{
      this._proyectoService.getProyectosByU(id).subscribe(
        response=>{
          this.proyectos=response.data;
          console.log(response.data);
          },
            error=>{
            console.log("Error");
            }
      )

    }

    cambiarpagina(e:PageEvent){
      console.log(e);
      this.desde = e.pageIndex * e.pageSize;
      this.hasta = this.desde + e.pageSize;

    }




}
