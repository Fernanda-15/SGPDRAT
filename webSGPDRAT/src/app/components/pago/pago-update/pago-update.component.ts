import { Component, OnInit } from '@angular/core';
import { Pago} from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import{timer} from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pago-update',
  templateUrl: './pago-update.component.html',
  styleUrls: ['./pago-update.component.css'], 
  providers: [
    PagoService,
    LogService,
    UserService,
    ProyectoService
  ]
})
export class PagoUpdateComponent implements OnInit {

  
  public pago:Pago;
  public proyecto:Proyecto;
  public pagos:any[]=[];
  public status: number;
  public reset=false;
  public log:Log;
  public identity:any;

  constructor(
    private _pagoService: PagoService,
    private _proyectoService: ProyectoService,
    private _userService:UserService,
    private _logService:LogService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.pago = new Pago(0,0,0,0,0,"","");
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.status=-1;
    this.log = new Log(0,0,"","","");
   }

  ngOnInit(): void { 
    this.loadStorage();
    this.reset=false;
    this.getPago();
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
  }

 
  getPago():void{

    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._pagoService.getPago(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.pago=response.data;
            this.getProyecto();
          }
        },
        error=>{
         this._router.navigate(['']); 
        }
      );
    });
  }

  getProyecto():void{
   
       this._proyectoService.getProyecto(this.pago.proyecto_id).subscribe(
         response=>{
           if(response.status=='success'){
             this.proyecto=response.data;
           }else{
             this._router.navigate(['']);
           }
         },
         error=>{
          this._router.navigate(['']); 
         }
       );
     
    }
  
  insertLogUpdate(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se actualizó el pago "+texto,"");
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
    if(this.pendiente()){
      if(!this.existeNP()){
        this._pagoService.update(this.pago).subscribe(
          response=>{
        if(response.code==200){
        //  this.insertLogUpdate(this.pago.proyecto_id,this.pago.numero+" | Monto: "+this.pago.monto.toString()+" | N Transaccion: "+this.pago.numero_transaccion)
          form.reset();
          this._router.navigate(['/pago-list', this.proyecto.id]);
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
        this.status = 3;
        counter.subscribe(n=>{
          console.log(n);
          this.status=-1;
        });
      }


    }

   
  }

  pendiente():any{
    let deuda:number = 0;
    let abonos:number = 0;
    let sub:number = 0;

    deuda = this.proyecto.monto_adjudicado;

    if(this.pagos.length != 1){
      for(let i in this.pagos){
        abonos= abonos + (this.pagos[i].monto);
      }  
    }
      sub = abonos + this.pago.monto;
      this.pago.proyeccion = deuda - abonos;
      console.log("Proyeccion", this.pago.proyeccion);
      
      console.log("PENDIENTE");
      if(this.pago.proyeccion != 0){
        if(sub <= deuda){
          return true;
        }else{
          this.status=2;
        }
      }else{
        this.status=1;
      }
      return false;
  }

  loadPagos(id:number):void{
    this._proyectoService.getPagos(id).subscribe(
      response=>{
          this.pagos = response.data;
          this.getPendiente();
          console.log(this.pagos);
      },
      error=>{
        console.log(error);
      }
    );
  }

   getPendiente(){
    let p:number=0;
    let deuda:number = 0;
    let abonos:number = 0;
    let sub:number = 0;
    deuda = this.proyecto.monto_adjudicado;
    for(let i in this.pagos){
       abonos= abonos + (this.pagos[i].monto);
     }  
      sub = abonos + this.pago.monto;
      p = deuda - abonos;
      this.pago.proyeccion=p;
      console.log("GET PENDIENTE");
      
  }
  existeNP():any{
    let existe=0;
    console.log(this.pagos); 
    for(let i in this.pagos){
      if(this.pagos[i].numero == this.pago.numero){
        existe = existe+1;
        console.log("EXISTE", existe);
      }
    }
    if(existe>0){
      return true;
    }
    
    return false;
  }
}
