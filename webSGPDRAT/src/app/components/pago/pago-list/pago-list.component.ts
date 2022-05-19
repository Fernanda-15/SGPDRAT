import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { PagoService } from 'src/app/services/pago.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Pago } from 'src/app/models/pago';
import{Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pago-list',
  templateUrl: './pago-list.component.html',
  styleUrls: ['./pago-list.component.css'],
  providers: [PagoService,
    ProyectoService]
})
export class PagoListComponent implements OnInit {

  public pagos:any;
  public pago:Pago;
  public proyecto:Proyecto;

  constructor(
    private _proyectoService:ProyectoService,
    private _pagoService:PagoService,
    private _route:ActivatedRoute, 
    private _router:Router,
  ) { 
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
          console.log(this.pagos);
      },
      error=>{
        console.log(error);
      }
    );
  }

  delete(id:number):void{
    this._pagoService.deletePago(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadPagos(this.proyecto.id);
        }
        else{
          console.log(response);
        }

      },
      error=>{
        console.log(error);
      }
    );
  }

}
