import { Component, OnInit } from '@angular/core';
import { Pago} from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import{timer} from 'rxjs';

@Component({
  selector: 'app-pago-create',
  templateUrl: './pago-create.component.html',
  styleUrls: ['./pago-create.component.css'],
  providers: [
    ProyectoService,
    PagoService
  ]
})
export class PagoCreateComponent implements OnInit {

  public pago:Pago;
  public proyecto:Proyecto;
  public pagos:any;
  public status:number;

  constructor(
    private _proyectoService: ProyectoService, 
    private _pagoService: PagoService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.status = -1;
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.pago = new Pago(0,0,0,0,0,"","");
  }

  ngOnInit(): void {
    this.getProyecto();
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

  onSubmit(form:any){
  let counter=timer(5000); 
  this.pago.proyecto_id = this.proyecto.id;
    if(this.pendiente()){
      if(!this.existeNP()){
        this._pagoService.registro(this.pago).subscribe(
          response=>{
            if(response.code == 200){
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
      this.pago.proyeccion=p;
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
      
  }

}
