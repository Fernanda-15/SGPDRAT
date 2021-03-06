import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from '../../../models/proyecto';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { timer } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
@Component({
  selector: 'app-proyecto-update',
  templateUrl: './proyecto-update.component.html',
  styleUrls: ['./proyecto-update.component.css'],
  providers: [ProyectoService, UserService, LogService]
})
export class ProyectoUpdateComponent implements OnInit {

  public showContent: boolean = false;
  public proyecto: any;
  public status: any;
  public reset = false;
  public users: any;
  public identity:any;
  private log:Log;
  constructor(
    private _proyectoService: ProyectoService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _logService: LogService,
  ) {
    this.log = new Log(0,0,"","","");
  }

  ngOnInit(): void {
    setTimeout(()=>this.showContent=true, 200);
    this.loadStorage();
    this.reset = false;
    this.proyecto = new Proyecto(0, 0, "", "", "", "", "", "", "", 0);
    this.getProyecto();
    this.getUsers();
  }

  getProyecto(): void {

    this._route.params.subscribe(params => {

      let id = params['id'];
      console.log(id);
      this._proyectoService.getProyecto(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.proyecto = response.data;
          } else {
            this._router.navigate(['']);
          }
        },
        error => {
          this._router.navigate(['']);
        }
      );
    });
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
  }

  insertLogUpdate(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se actualizó el proyecto "+texto,"");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response=>{
      },
      error=>{
        console.log(error);
      }
    );
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response.code == 200) {
          this.users = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: any): void {
    let counter = timer(5000);
    if (this.proyecto.fecha_final >= this.proyecto.fecha_inicio) {
      this._proyectoService.update(this.proyecto).subscribe(
        response => {
          if (response.code == 200) {
            this.insertLogUpdate(this.proyecto.id,this.proyecto.nombre);
            form.reset();
            this._router.navigate(['/proyecto-list']);
          } else {
            this.status = 0;
            this.reset = true;
            counter.subscribe(n => {
              console.log(n);
              this.status = -1;
            });
          }
        },

        error => {
          this.status = 0;
          console.log(<any>error);
          counter.subscribe(n => {
            console.log(n);
            this.status = -1;
          });
        }
      );

    } else {
      this.status = 1;
      counter.subscribe(n => {
        console.log(n);
        this.status = -1;
      });
    }


  }


}
