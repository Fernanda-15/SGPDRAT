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
  public status: any;
  public reset=false;

  constructor(
    private _pagoService: PagoService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.pago = new Pago(0,0,0,0,0,"","");
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.status=-1;
   }

  ngOnInit(): void { 
    this.getPago();
    this.reset=false;
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
    this._pagoService.update(this.pago).subscribe(
      response=>{
    if(response.code==200){
      this.status=-1;
     
      }
      },

      error=>{
        console.log(error);
        this.status=0;
      }
    );
  }
}
