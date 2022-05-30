import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { PagoService } from 'src/app/services/pago.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Pago } from 'src/app/models/pago';
import{Router,ActivatedRoute} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pago-list',
  templateUrl: './pago-list.component.html',
  styleUrls: ['./pago-list.component.css'],
  providers: [PagoService,
    ProyectoService,
    LogService,
    UserService]
})
export class PagoListComponent implements OnInit {

  public pagos:any[]=[];
  public pago:Pago;
  public proyecto:Proyecto;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 3;
  public total:number;
  public status:number;
  public log:Log;
  public identity:any;
  

  constructor(
    private _proyectoService:ProyectoService,
    private _pagoService:PagoService,
    private _userService:UserService,
    private _logService:LogService,
    private _route:ActivatedRoute,
    private _router:Router,
  ) {
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.pago = new Pago(0,0,0,0,0,"","");
    this.total=0;
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

  insertLogDelete(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se eliminó el pago "+texto,"");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response=>{
      },
      error=>{
        console.log(error);
      }
    );
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.loadPagos(id);
          }
        },
        error=>{
          console.log(error);
          this._router.navigate(['']);
        }
      );
    });
  }

  loadPagos(id:number):void{
    this._proyectoService.getPagos(id).subscribe(
      response=>{
          this.pagos = response.data;
          this.pendiente();
          console.log(this.pagos);
      },
      error=>{
        console.log(error);
      }
    );
  }

  delete(id:number):void{
  let counter=timer(5000);
    this._pagoService.deletePago(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.insertLogDelete(this.pago.proyecto_id,id.toString());
          this.loadPagos(this.proyecto.id);
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

  pendiente():void{
    let deuda:number = 0;
    let abonos:number = 0;
    deuda = this.proyecto.monto_adjudicado;
    for(let i in this.pagos){
       abonos= abonos + (this.pagos[i].monto);
     }
     this.total = deuda - abonos;
  }
}
