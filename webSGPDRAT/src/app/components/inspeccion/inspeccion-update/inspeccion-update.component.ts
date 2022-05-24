import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Inspeccion } from 'src/app/models/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import { Fotos } from 'src/app/models/fotos';
import { FotosService } from 'src/app/services/fotos.service';
import { Archivos } from 'src/app/models/archivos'; 
import { ArchivosService } from 'src/app/services/archivos.service';
import {global} from '../../../services/global';
import{Router,ActivatedRoute} from '@angular/router';
import{timer} from 'rxjs';

@Component({
  selector: 'app-inspeccion-update',
  templateUrl: './inspeccion-update.component.html',
  styleUrls: ['./inspeccion-update.component.css'],
  providers: [InspeccionService, FotosService, ArchivosService]
})
export class InspeccionUpdateComponent implements OnInit {

  public foto:Fotos;
  public inspeccion:Inspeccion;
  public archivo:Archivos;
  public identity:any;
  public status:number;
  public reset:any;

  constructor(
    private _inspeccionService:InspeccionService,
    private _fotosService:FotosService,
    private _archivosService:ArchivosService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.inspeccion = new Inspeccion(0,0,0,0,"","","",0,0,0);
    this.foto = new Fotos(0,0,"");
    this.archivo = new Archivos(0,0,"");
    this.status=-1;
    this.reset=false;
   }

  ngOnInit(): void {
    this.getInspeccion();
  }

  getInspeccion():void{

    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._inspeccionService.getInspeccion(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.inspeccion=response.data;
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
      this._inspeccionService.update(this.inspeccion).subscribe(
          response=>{
          if(response.code==200){
            form.reset();
            this.onSubmit2();
            this._router.navigate(['/inspeccion-list', this.inspeccion.proyecto_id]);
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
    
    }

    imageUploaded(response:any){
      console.log("ACA",response.body.image);
        
        if(response.body.code==200){
         let data=response.body;
         console.log("Foto",data.image);
         this.foto.nombre=data.image;
         this.foto.inspeccion_id = this.inspeccion.id;
         
        }else{
          
        }
        console.log(response);
      }
  
  
      docUploaded(response:any){ 
          if(response.body.code==200){
  
            console.log("ACA2",response.body);
         
           let data=response.body;
            this.archivo.nombre=data.file;
            
            this.archivo.inspeccion_id = this.inspeccion.id;
           
          }else{
            
          }
          console.log(response);
        }
    

    public afuConfig={
      multiple:false,
      formatAllowed:".pdf, .docx, .txt, .gif",
      method:"POST",
      maxSize:3,
      uploadAPI:{
        url:global.urlApi+'fotos/upload',
        headers:{
            "token":`${localStorage.getItem('token')}` 
        } 
      },
      theme:"attachPin",
      hideProgressBar:false,
      hideResetBtn:true,
      hideSelectBtn:false,
      attachPinText:'Subir imagen',
      replaceTexts: {
        selectFileBtn: 'Seleccione un archivo',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Imagen...',
        afterUploadMsg_success: 'Carga exitosa !',
        afterUploadMsg_error: 'Error al carga el archivo !',
        sizeLimit: 'Tamaño limite'
      }
  
    }
  
  
    public afuConfig2={
      multiple:false,
      formatAllowed:".pdf, .docx, .txt",
      method:"POST",
      maxSize:3,
      uploadAPI:{
        url:global.urlApi+'archivos/upload',
        headers:{
            "token":`${localStorage.getItem('token')}` 
        } 
      },
      theme:"attachPin",
      hideProgressBar:false,
      hideResetBtn:true,
      hideSelectBtn:false,
      attachPinText:'Subir archivo',
      replaceTexts: {
        selectFileBtn: 'Seleccione un archivo',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Archivo...',
        afterUploadMsg_success: 'Carga exitosa !',
        afterUploadMsg_error: 'Error al carga el archivo !',
        sizeLimit: 'Tamaño limite'
      }
  
    }


    
    onSubmit2(){
      this._fotosService.registro(this.foto).subscribe(
        response=>{
          if(response.code == 200){
            console.log("SUCCESS UPLOAD FOTO");
            }
          },
          error=>{
          console.log(<any>error);
               
        }

       );
    }

    onSubmit3(){
      this._archivosService.registro(this.archivo).subscribe(
        response=>{
          if(response.code == 200){
              console.log("SUCCESS UPLOAD ARCHIVO");
            }
          },
          error=>{
          console.log(<any>error);
               
        }

       );
    }
}

