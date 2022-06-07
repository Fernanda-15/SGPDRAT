import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UserService } from 'src/app/services/user.service';
import{Router} from '@angular/router';
import{timer} from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import {global} from '../../../services/global';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-proyecto-create',
  templateUrl: './proyecto-create.component.html',
  styleUrls: ['./proyecto-create.component.css'],
  providers: [
    ProyectoService,
    UserService,
  LogService]
})
export class ProyectoCreateComponent implements OnInit {

  public showContent: boolean = false;
  public proyecto:Proyecto;
  public status:number;
  public reset=false;
  public users:any;
  public proyectito:Proyecto;
  public id:number;
  public identity:any;
  private log:Log;
  constructor(
    private _proyectoService: ProyectoService,
    private _userService: UserService,
    private _logService: LogService,
    private _router:Router,
  ) {
    this.status=-1;
    this.id=0;
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.proyectito = new Proyecto(0,0,"","","","","","","",0);
    this.log = new Log(0,0,"","","");
  }

  ngOnInit(): void {
    setTimeout(()=>this.showContent=true, 200);
    this.loadStorage();
    this.getUsers();
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.proyecto.user_id=this.identity.sub;
  }

  getUsers():any{
    this._userService.getUsers().subscribe(
      response=>{
        if(response.code==200){
          this.users=response.data;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  ruta():any{
    this._proyectoService.getUltimo().subscribe(
      response=>{
        if(response.code==200){
          this.proyectito=response.data;
          this.insertLogCreate(this.proyectito.id,this.proyectito.nombre);
          this._router.navigate(['/tarea-list', this.proyectito.id]);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  insertLogCreate(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se crea el proyecto "+texto,"");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response=>{
      },
      error=>{
        console.log(error);
      }
    );
  }


  onSubmit(form:any){
    let counter=timer(5000);
    let e:number=0;
    let proyectonombre = this.proyecto.nombre;
    this.proyecto.user_id = this.identity.sub;
    if(this.proyecto.fecha_final >= this.proyecto.fecha_inicio){
      if(this.proyecto.user_id > 0){
        if(this.proyecto.forma_pago != ""){
          let proyectoid = this.proyecto.id;
          this._proyectoService.registro(this.proyecto).subscribe(
            response=>{
              if(response.code == 200){
                form.reset();
                this.ruta();
                }else{
                        this.status=0;
                        counter.subscribe(n=>{
                          console.log(n);
                          this.status=-1;
                        });
                      }
              },
              error=>{
              this.status = 0;
              console.log(<any>error);
              counter.subscribe(n=>{
                console.log(n);
                this.status=-1;
              });

            }
          );
        }else{
          this.status=3;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }

      }else{
        this.status=2;
        counter.subscribe(n=>{
          console.log(n);
          this.status=-1;
        });
      }

    }else{
      this.status=1;
      counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
    }

  }

}
