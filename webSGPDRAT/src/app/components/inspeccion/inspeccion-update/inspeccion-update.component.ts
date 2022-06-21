import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Inspeccion } from 'src/app/models/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import { Fotos } from 'src/app/models/fotos';
import { FotosService } from 'src/app/services/fotos.service';
import { Archivos } from 'src/app/models/archivos';
import { ArchivosService } from 'src/app/services/archivos.service';
import { global } from '../../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { UserService } from 'src/app/services/user.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea } from 'src/app/models/tarea';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';

@Component({
  selector: 'app-inspeccion-update',
  templateUrl: './inspeccion-update.component.html',
  styleUrls: ['./inspeccion-update.component.css'],
  providers: [InspeccionService, FotosService, ArchivosService, LogService,
    UserService, TareaService, ProyectoService]
})
export class InspeccionUpdateComponent implements OnInit {

  public foto: Fotos;
  public inspeccion: Inspeccion;
  public archivo: Archivos;
  public identity: any;
  public status: number;
  public reset: any;
  private log: Log;
  public fotos: any[] = [];
  public fotos2: any[] = [];
  public archivos: any[] = [];
  public desde: number = 0;
  public hasta: number = 3;
  public tareas: any[] = [];
  public tarea:Tarea;
  public tareasEjecutadas: number;
  public tareasTotal: number;
  public avanceObra: number;
  public pagos: any;
  public porcentajePagado: number;
  public proyecto: Proyecto;

  constructor(
    private _inspeccionService: InspeccionService,
    private _fotosService: FotosService,
    private _archivosService: ArchivosService,
    private _tareaService: TareaService,
    private _logService: LogService,
    private _userService: UserService,
    private _proyectoService: ProyectoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.inspeccion = new Inspeccion(0, 0, 0, 0, "", "", "", 0, 0, 0);
    this.foto = new Fotos(0, 0, "");
    this.archivo = new Archivos(0, 0, "");
    this.status = -1;
    this.reset = false;
    this.log = new Log(0, 0, "", "", "");
    this.tarea=new Tarea(0, 0, 0, "", 0, 0, "", "");
    this.proyecto=new Proyecto(0, 0, "", "", "", "", "", "", "", 0);
    this.tareasEjecutadas = 0;
    this.tareasTotal = 0;
    this.avanceObra = 0;
    this.porcentajePagado = 0;
  }

  ngOnInit(): void {
    this.loadStorage();
    this.getInspeccion();
    
  }


  public loadStorage() {
    this.identity = this._userService.getIdentity();
    
  }

  insertLogUpdate(proyectoid: number, texto: string) {
    this.log = new Log(0, proyectoid, this.identity.nombreUsuario, "Se ha modificado la inspeccion " + texto, "");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response => {
      },
      error => {
        console.log(error);
      }
    );
  }

  getInspeccion(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this._inspeccionService.getInspeccion(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.inspeccion = response.data;
            this.getProyecto();
          }
        },
        error => {
          this._router.navigate(['']);
        }
      );
    });
  }

  getProyecto(): void {
      this._proyectoService.getProyecto(this.inspeccion.proyecto_id).subscribe(
        response => {
          if (response.status == 'success') {
            this.proyecto = response.data;
            this.loadTareas(this.inspeccion.proyecto_id);
          } else {
            console.log('AQUI');
            this._router.navigate(['']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['']);
        }
      );
    
  }



  loadTareas(id: number): void {
    this._proyectoService.getTareas(id).subscribe(
      response => {
        console.log(response.data);
        this.tareas = response.data;
        this.tareas.forEach((t: any) => {
          this.tareasTotal += 1;
          if (t.avance == 100) {
            this.tareasEjecutadas += 1;
          }
        })
        this.avanceObra = (this.tareasEjecutadas / this.tareasTotal) * 100;
        this.getFotos(this.inspeccion.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  //CARGAR FOTOS

  getFotos(id:number):void{
    this._inspeccionService.getFotos(id).subscribe(
      response=>{
          this.fotos = response.data;
          this.getDocumentos(id);
      },
      error=>{
        console.log(error);
      }
    );
  }

  getDocumentos(id:number):void{
    this._inspeccionService.getArchivos(id).subscribe(
      response=>{
          this.archivos = response.data; 
      },
      error=>{
        console.log(error);
      }
    );
  }

  onSubmit(form: any) {
    let counter = timer(5000);
    this._inspeccionService.update(this.inspeccion).subscribe(
      response => {
        if (response.code == 200) {
          this.insertLogUpdate(this.inspeccion.proyecto_id, " Numero : " + this.inspeccion.numero + " | Avance Obra: " + this.inspeccion.avance_obra);
          form.reset();
          if(this.foto.nombre!=""){
            this.onSubmit2();
          }
          if(this.archivo.nombre!=""){
            this.onSubmit3();
          }
          this._router.navigate(['/inspeccion-list', this.inspeccion.proyecto_id]);
        }
      },
      error => {
        this.status = 0;
        console.log(<any>error);
        counter.subscribe(n => {
          console.log(n);
          this.status = -1;
        });

      }
    );

  }

  imageUploaded(response: any) {
    this.foto = new Fotos(0, 0, "");
    let id = 0;
    console.log("ACA", response.body.image);
    let tama = this.fotos.length;
    if(tama != 0){
      id = this.fotos[tama -1].id;
    }else{
      id = 1;
    }
    if (response.body.code == 200) {
      let data = response.body;
      console.log("Foto", data.image);
      this.foto.nombre = data.image; //NOMBRE DE LA IMAGEN
      this.foto.inspeccion_id = this.inspeccion.id; //Numero de inspeccion
      id = id+1;
      this.foto.id = id;
      this.fotos.push(this.foto); //Agregar foto en el arreglo 1
      this.fotos2.push(this.foto); //Agregar foto en arreglo de fotos a subir
      
    } else {

    }
    console.log(response);
  }


  docUploaded(response: any) {
    this.archivo = new Archivos(0, 0, "");
    if (response.body.code == 200) {

      console.log("Documento", response.body);
      let data = response.body;
      this.archivo.nombre = data.file;
      this.archivo.inspeccion_id = this.inspeccion.id;
      this.archivos.push(this.archivo);

    } else {

    }
    console.log(response);
  }
  public afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    method: "POST",
    maxSize: 10,
    uploadAPI: {
      url: global.urlApi + 'fotos/upload',
      headers: {
        "token": `${localStorage.getItem('token')}`
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Subir imagen',
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


  public afuConfig2 = {
    multiple: true,
    formatsAllowed: ".pdf,.docx,.txt",
    method: "POST",
    maxSize: 3,
    uploadAPI: {
      url: global.urlApi + 'archivos/upload',
      headers: {
        "token": `${localStorage.getItem('token')}`
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Subir archivo',
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


  onSubmit2() {
    for (let i in this.fotos2) {
        //this.fotos2[i].inspeccion_id = this.foto.inspeccion_id;
        console.log("ONSUB2", this.fotos2[i]);
        this._fotosService.registro(this.fotos2[i]).subscribe(
          response => {
            if (response.code == 200) {
              console.log("SUCCESS UPLOAD FOTO");
            }
          },
          error => {
            console.log(<any>error);
  
          }
  
        );
     
   
    }
  }

  onSubmit3() {
    for (let i in this.archivos) {
      this.archivos[i].inspeccion_id = this.archivo.inspeccion_id;
      this._archivosService.registro(this.archivos[i]).subscribe(
        response => {
          if (response.code == 200) {
            console.log("SUCCESS UPLOAD ARCHIVO");
            this._router.navigate(['/inspeccion-list', this.inspeccion.proyecto_id]);
          }
        },
        error => {
          console.log(<any>error);

        }

      );
    }
  }

  
  delete(id:any): void { //ELIMINAR FOTO
    let indice: any;
    let eliminar:any;
    let counter = timer(5000); //AGREGAR MENSAJE
    let eliminar2:any;

    console.log("FOTOS", this.fotos);
    console.log("FOTO", id);

    indice = this.fotos.indexOf(id); // obtenemos la posicion de la foto ren el arreglo fotos
    console.log("ARREGLO I1",indice);

    let indice2 = this.fotos2.indexOf(id); //INDICE SEGUNDO ARREGLO (FOTOS A SUBIR)
    console.log("ARREGLO I2",indice2);

    eliminar=this.fotos[indice].id; //agarra el ID de la foto
    eliminar2=this.fotos[indice].nombre; //agarra el nombre de la foto

    if(indice2 == -1){  //Verifica si la foto tiene ID, si tiene se debe eliminar de la base de datos
      this._fotosService.deleteFoto(eliminar).subscribe( //Llamar funcion eliminar
        response => {
          if (response.code == 200) {
            console.log("ELIMINADA CORRECTAMENTE");
            this.fotos.splice(indice, 1); // 1 es la cantidad de elemento a eliminar del arreglo
            this.status = 4;
            counter.subscribe(n => {
              console.log(n);
              this.status = -1;
            });
          }
        },
        error => {
          console.log(<any>error);
  
        }
  
      );
    }else{ //SI LA FOTO NO ESTÀ REGISTRADA EN BD
      
    this._fotosService.liberar(eliminar2).subscribe( //llama la funcion para eliminar imagen del storage
      response => {
        if (response.code == 200) {
          console.log("ELIMINADA CORRECTAMENTE");
          this.fotos.splice(indice, 1); // 1 es la cantidad de elemento a eliminar QUITA LA IMAGEN DEL ARREGLO 1
          this.fotos2.splice(indice2,1); //QUITAR DE FOTOS A SUBIR
          this.status = 4;
          counter.subscribe(n => {
            console.log(n);
            this.status = -1;
          });
        }
      },
      error => {
        console.log(<any>error);

      }


    );
    }
 

  }

  delete2(id: number): void { //ELIMINAR DOCUMENTO
    let indice: any;
    let eliminar:any;
    let eliminar2:any;
    let counter = timer(5000); //AGREGAR MENSAJE

    indice = this.archivos.indexOf(id); // obtenemos el indice

    eliminar=this.archivos[indice].id;
    eliminar2=this.archivos[indice].nombre;

    if(eliminar!=0){
      this._archivosService.deletearchivos(eliminar).subscribe(
        response => {
          if (response.code == 200) {
            console.log("ELIMINADO CORRECTAMENTE");
            this.archivos.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
            this.status = 5;
            counter.subscribe(n => {
              console.log(n);
              this.status = -1;
            });
          }
        },
        error => {
          console.log(<any>error);
  
        }
  
      );
    }else{
      this._archivosService.liberar(eliminar2).subscribe(
        response => {
          if (response.code == 200) {
            console.log("ELIMINADO CORRECTAMENTE");
            this.archivos.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
            this.status = 4;
            counter.subscribe(n => {
              console.log(n);
              this.status = -1;
            });
          }
        },
        error => {
          console.log(<any>error);
  
        }
  
  
      );
    }
   
  }

  cambiarpagina(e: PageEvent) {
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }

  getTarea(id: number, a: any) {
    this._tareaService.getTarea(id).subscribe(
      response => {
        if (response.code == 200) {
          this.tarea = response.data;
          //this.modificar(a);
        }
      },

      error => {
        console.log(error);
      }
    );

  }
}
