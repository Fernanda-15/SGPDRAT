import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';


@Component({
  selector: 'app-proyecto-info',
  templateUrl: './proyecto-info.component.html',
  styleUrls: ['./proyecto-info.component.css'],
  providers: [TareaService,
            ProyectoService,
          UserService,
        PagoService]
})
export class ProyectoInfoComponent implements OnInit {
  
  public proyecto:Proyecto;
  private user:User;
  public user_id:number;
  public userName:string;
  public tareas:any;
  public proyecto_id:string;
  public tareasEjecutadas:number;
  public tareasTotal:number;
  public avanceObra:number;
  public pagosP:any;
  public porcentajePagado:number;
  public hoyEs :any;
  public today: Date = new Date();
  public hoy = new DatePipe('en-US');
  public identity:any;
  private token:any;
  public mostrarInfoPDF:boolean;
  public tarea:Tarea;
  public pagos:any[]=[];
  public pago:Pago;
  public total:number;
  
  //PDF
  @ViewChild('htmlData') htmlData!: ElementRef;
  //PDF
  constructor(
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _userService:UserService,
    private _pagoService:PagoService,
    private _route:ActivatedRoute, 
    private _router:Router,
  ) { 
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.user = new User(0,"","","","","","","","");
    this.userName = "";
    this.proyecto_id = "";
    this.tareasEjecutadas = 0;
    this.tareasTotal = 0;
    this.avanceObra = 0;
    this.porcentajePagado = 0;
    this.user_id = 0;
    this.hoyEs = this.hoy.transform(Date.now(), 'dd/MM/yyyy');
    this.tarea = new Tarea(0,0,0,"",0,0,"","");
    this.mostrarInfoPDF = true;
    this.pago = new Pago(0,0,0,0,0,"","");
    this.total=0;
  }

  ngOnInit(): void {
    this.loadStorage();
    this.getProyecto();
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            console.log(this.proyecto);
            this.getUserName();
            this.proyecto_id = this.proyecto.id.toString();
            console.log("ID PROYECTO "+this.proyecto_id);
            this.loadTareas(this.proyecto.id); 
            console.log(this.tareas);
            this.loadPagos(id);
            console.log(this.pagos);
          }else{
            console.log('AQUI');
            //this._router.navigate(['']);
          }
        },
        error=>{
          console.log(error);
         //this._router.navigate(['']); 
        }
      );
    });
  }

  getUserName(){
      this._userService.getUser(this.proyecto.user_id).subscribe(
        response=>{
          if(response.status=='success'){
            this.user=response.data;
            console.log(this.user);
            this.userName = this.user.nombre;
            this.user_id = this.user.id;
            console.log(this.user_id);
          }else{
            console.log('AQUI');
            //this._router.navigate(['']);
          }
        },
        error=>{
          console.log(error);
         //this._router.navigate(['']); 
        }
      );
  }

  loadTareas(id:number):void{
    this._proyectoService.getTareas(id).subscribe(
      response=>{
        console.log(response.data);
          this.tareas = response.data;
          this.tareas.forEach((t:any) => {
            this.avanceObra = this.avanceObra + (t.avance*t.peso)/100;
            this.tareasTotal +=1;
            if(t.avance == 100){
              this.tareasEjecutadas += 1;
            }
          })
      },
      error=>{
        console.log(error);
      }
    );
  }

  loadPorcentajePagado(id:number){
    this._proyectoService.getPagos(id).subscribe(
      response=>{
        console.log(response.data);
          let pagado = 0;
          this.pagosP = response.data;
          this.pagosP.forEach((p:any) => {
          pagado = pagado + p.monto;
          })
          this.porcentajePagado = (this.pagosP/this.proyecto.monto_adjudicado)*100;
      },
      error=>{
        console.log(error);
      }
    );
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  public openPDF(): void {
    this.mostrarInfoPDF = true;
    let DATA: any = document.getElementById('pdf');
    this.hoyEs = this.hoy.transform(Date.now(), 'dd/MM/yyyy');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
      this.mostrarInfoPDF = false;
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
