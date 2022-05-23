import { Component, OnInit } from '@angular/core';
import { Pago} from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import{timer} from 'rxjs';


@Component({
  selector: 'app-pago-update',
  templateUrl: './pago-update.component.html',
  styleUrls: ['./pago-update.component.css'], 
  providers: [
    PagoService
  ]
})
export class PagoUpdateComponent implements OnInit {

  
  public pago:Pago;
  public proyecto:Proyecto;
  public pagos:any;
  public status: number;
  public reset=false;

  constructor(
    private _pagoService: PagoService,
    private _proyectoService: ProyectoService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.pago = new Pago(0,0,0,0,0,"","");
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.status=-1;
   }

  ngOnInit(): void { 
    this.getProyecto();
    this.reset=false;
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
    let id=params['id'];
       this._proyectoService.getProyecto(id).subscribe(
         response=>{
           if(response.status=='success'){
             this.proyecto=response.data;
             this.loadPagos(this.proyecto.id);
           }else{
             this._router.navigate(['']);
           }
         },
         error=>{
          this._router.navigate(['']); 
         }
       );
     });
    }
 
  getPago():void{

    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._pagoService.getPago(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.pago=response.data;
          }
        },
        error=>{
         this._router.navigate(['']); 
        }
      );
    });
  }


  onSubmit(form:any){
  let counter=timer(5000); 
    if(this.pendiente()){
      if(!this.existeNP()){
        this._pagoService.update(this.pago).subscribe(
          response=>{
        if(response.code==200){
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

      if(p != 0){
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
          console.log(this.pagos);
      },
      error=>{
        console.log(error);
      }
    );
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
