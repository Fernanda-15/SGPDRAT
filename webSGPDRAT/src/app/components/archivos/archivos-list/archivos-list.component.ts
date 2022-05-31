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
  public url:any;
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
}
