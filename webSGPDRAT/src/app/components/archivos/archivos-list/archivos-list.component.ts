import { Component, OnInit } from '@angular/core';
import { Inspeccion } from 'src/app/models/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import { Fotos } from 'src/app/models/fotos';
import { FotosService } from 'src/app/services/fotos.service';
import { Archivos } from 'src/app/models/archivos';
import { ArchivosService } from 'src/app/services/archivos.service';
import { global } from 'src/app/services/global';
import{Router,ActivatedRoute} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';

@Component({
  selector: 'app-archivos-list',
  templateUrl: './archivos-list.component.html',
  styleUrls: ['./archivos-list.component.css'],
  providers: [InspeccionService, FotosService, ArchivosService]
})
export class ArchivosListComponent implements OnInit {

  public foto:Fotos;
  public fotos: any[]=[];
  public archivo:Archivos;
  public archivos: any[]=[];
  public inspeccion:Inspeccion;
  public desde:number = 0;
  public hasta:number = 3;
  public desde2:number = 0;
  public hasta2:number = 3;
  public url:any;
  public status:number=-1;
  public tipo:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _fotosService:FotosService,
    private _archivoService:ArchivosService,
    private _inspeccionService:InspeccionService,
  ) { 
    this.foto=new Fotos(0,0,"");
    this.archivo=new Archivos(0,0,"");
    this.inspeccion=new Inspeccion(0,0,0,0,"","","",0,0,0);
    this.url = global.urlApi;
  }

  ngOnInit(): void {
    this.getInspeccion();
  }

  getInspeccion():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._inspeccionService.getInspeccion(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.inspeccion=response.data;
            this.loadFotos(id);
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

  loadFotos(id:number):void{
    this._inspeccionService.getFotos(id).subscribe(
      response=>{
          this.fotos = response.data;
          this.loadDocumento(id);
      },
      error=>{
        console.log(error);
      }
    );
  }

  loadDocumento(id:number):void{
    this._inspeccionService.getArchivos(id).subscribe(
      response=>{
          this.archivos = response.data; 
      },
      error=>{
        console.log(error);
      }
    );
  }

  getTipo(nombre:any):any{
    if( nombre.includes(".pdf")){
      return 1;
    }
    if(nombre.includes(".docx")){
      return 2;
    }
    if(nombre.includes(".txt")){
      return 3;
    }
    return 4;
  }
  delete(id:number):void{
    let counter=timer(5000);
    this._fotosService.deleteFoto(id).subscribe(
      response=>{
        if(response.status=="success"){
          this.status = -1;
          this.loadFotos(this.inspeccion.id);
          this.status=0;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }
        else{
          this.status=2;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }

      },
      error=>{
        console.log(error);
      }
    );
  }

  delete2(id:number):void{
    let counter=timer(5000);
    this._archivoService.deletearchivos(id).subscribe(
      response=>{
        if(response.status=="success"){
          this.status = -1;
          this.loadDocumento(this.inspeccion.id);
          this.status=0;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }
        else{
          this.status=2;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }

      },
      error=>{
        console.log(error);
      }
    );
  }


  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }

  cambiarpagina2(e:PageEvent){
    console.log(e);
    this.desde2 = e.pageIndex * e.pageSize;
    this.hasta2 = this.desde2 + e.pageSize;

  }


  
}
