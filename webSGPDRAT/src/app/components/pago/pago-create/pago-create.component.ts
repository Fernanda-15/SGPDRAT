import { Component, OnInit } from '@angular/core';
import { Pago} from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';


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
    this.status = 1;
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.pago = new Pago(0,0,0,0,0,"","");
  }

  ngOnInit(): void {
  }

}
