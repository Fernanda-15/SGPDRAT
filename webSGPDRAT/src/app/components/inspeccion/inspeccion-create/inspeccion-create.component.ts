import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tarea } from 'src/app/models/tarea';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { UserService } from 'src/app/services/user.service';
import { Inspeccion } from 'src/app/models/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import {global} from '../../../services/global';
import { Fotos } from 'src/app/models/fotos';
import { FotosService } from 'src/app/services/fotos.service';
import { Archivos } from 'src/app/models/archivos'; 
import { ArchivosService } from 'src/app/services/archivos.service'

@Component({
  selector: 'app-tareas-avance',
  templateUrl: './inspeccion-create.component.html',
  styleUrls: ['./inspeccion-create.component.css'],
  providers: [TareaService,
    ProyectoService,
    InspeccionService, UserService, FotosService, ArchivosService]
})
export class InspeccionCreateComponent implements OnInit {
  public tareas: any[]=[];
  public tarea:Tarea;
  public proyecto:Proyecto;
  public foto:Fotos;
  public archivo:Archivos;
  public desde:number = 0;
  public hasta:number = 3;
  public avance:number;
  public inspeccion:Inspeccion;
  public identity:any;
  public tareasEjecutadas:number;
  public tareasTotal:number;
  public avanceObra:number;
  public pagos:any;
  public porcentajePagado:number;
  public reset:any;

  constructor(
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _userService:UserService,
    private _inspeccionService:InspeccionService,
    private _fotosService:FotosService,
    private _archivosService:ArchivosService,
    private _route:ActivatedRoute,
    private _router:Router,
  ) { 
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.tarea = new Tarea(0,0,0,"",0,0,"","");
    this.inspeccion = new Inspeccion(0,0,0,0,"","","",0,0,0);
    this.foto = new Fotos(0,0,"");
    this.archivo = new Archivos(0,0,"");

    this.avance=0;
    this.tareasEjecutadas = 0;
    this.tareasTotal = 0;
    this.avanceObra = 0;
    this.porcentajePagado = 0;
    this.reset=false;
  }

  ngOnInit(): void {
    this.loadStorage();
  }

  
  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.getProyecto();
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.loadTareas(id);
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

  loadTareas(id:number):void{
    this._proyectoService.getTareas(id).subscribe(
      response=>{
        console.log(response.data);
          this.tareas = response.data;
          this.tareas.forEach((t:any) => {
            this.tareasTotal +=1;
            if(t.avance == 100){
              this.tareasEjecutadas += 1;
            }
          })
          this.avanceObra = (this.tareasEjecutadas/this.tareasTotal)*100;
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

  getTarea(id:number,a:any){

    this._tareaService.getTarea(id).subscribe(
      response=>{
        if(response.code==200){
            this.tarea=response.data;
            this.modificar(a);
         }
      },

      error=>{
        console.log(error);
      }
    );

  }
  modificar(a:any){
   console.log("VALOR", a);
    this.tarea.avance = a;
    this._tareaService.update(this.tarea).subscribe(
      response=>{
        if(response.code==200){
          this.loadTareas(this.tarea.proyecto_id);
         }
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
          this.pagos = response.data;
          this.pagos.forEach((p:any) => {
          pagado = pagado + p.monto;
          })
          this.porcentajePagado = (this.pagos/this.proyecto.monto_adjudicado)*100;
      },
      error=>{
        console.log(error);
      }
    );
  }

  onSubmit(form:any){
    this.inspeccion.user_id = this.identity.sub;
    this.inspeccion.proyecto_id = this.proyecto.id;
    this.inspeccion.avance_obra = this.avanceObra;
    this.inspeccion.porcentaje_pagado = this.porcentajePagado;
    this.inspeccion.tareas_ejecutadas = this.tareasEjecutadas;

    this._inspeccionService.registro(this.inspeccion).subscribe(
      response=>{
        if(response.code == 200){
          console.log(response.data);
          form.reset();
          this.getUltimo();
        
          this._router.navigate(['/inspeccion-list',this.inspeccion.proyecto_id]);
          }
        },
        error=>{
        console.log(<any>error);
             
      }

    );

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

  imageUploaded(response:any){
    console.log("ACA",response.body.image);
      
      if(response.body.code==200){
       let data=response.body;
       console.log("Foto",data.image);
       this.foto.nombre=data.image;
       //this.inspeccion.id  recuperar el ultimo para asignarle
       
      }else{
        
      }
      console.log(response);
    }


    docUploaded(response:any){ 
        if(response.body.code==200){

          console.log("ACA2",response.body);
       
         let data=response.body;
          this.archivo.nombre=data.file;
        // console.log("Foto",data.image);
        // this.foto.nombre=data.image;
         //this.inspeccion.id  recuperar el ultimo para asignarle
         
        }else{
          
        }
        console.log(response);
      }
  
    getUltimo(){
      let inspeccion1;
      this._inspeccionService.getUltimo().subscribe(
        response=>{
          if(response.code==200){
            inspeccion1=response.data;
            this.foto.inspeccion_id = inspeccion1.id;
            this.archivo.inspeccion_id = inspeccion1.id;
            if(this.foto.nombre != ""){
              this.onSubmit2();
            }
            if(this.archivo.nombre != ""){
              this.onSubmit3();
            }  
          }
        },
        error=>{
          console.log(error);
        }
      );
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
