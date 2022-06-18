import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tarea } from 'src/app/models/tarea';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { UserService } from 'src/app/services/user.service';
import { Inspeccion } from 'src/app/models/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import { global } from '../../../services/global';
import { Fotos } from 'src/app/models/fotos';
import { FotosService } from 'src/app/services/fotos.service';
import { Archivos } from 'src/app/models/archivos';
import { ArchivosService } from 'src/app/services/archivos.service'
import { timer } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-tareas-avance',
  templateUrl: './inspeccion-create.component.html',
  styleUrls: ['./inspeccion-create.component.css'],
  providers: [TareaService,
    ProyectoService,
    InspeccionService, UserService, FotosService, ArchivosService, LogService]
})
export class InspeccionCreateComponent implements OnInit {
  public tareas: any[] = [];
  public tarea: Tarea;
  public proyecto: Proyecto;
  public foto: Fotos;
  public archivo: Archivos;
  public desde: number = 0;
  public hasta: number = 3;
  public avance: number;
  public inspeccion: Inspeccion;
  public inspecciones: any;
  public identity: any;
  public tareasEjecutadas: number;
  public tareasTotal: number;
  public avanceObra: number;
  public pagos: any;
  public porcentajePagado: number;
  public reset: any;
  public status: number;
  private log: Log;
  public fotos: any[] = [];
  public archivos: any[] = [];

  constructor(
    private _proyectoService: ProyectoService,
    private _tareaService: TareaService,
    private _userService: UserService,
    private _inspeccionService: InspeccionService,
    private _fotosService: FotosService,
    private _archivosService: ArchivosService,
    private _logService: LogService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.proyecto = new Proyecto(0, 0, "", "", "", "", "", "", "", 0);
    this.tarea = new Tarea(0, 0, 0, "", 0, 0, "", "");
    this.inspeccion = new Inspeccion(0, 0, 0, 0, "", "", "", 0, 0, 0);
    this.foto = new Fotos(0, 0, "");
    this.archivo = new Archivos(0, 0, "");
    this.log = new Log(0, 0, "", "", "");

    this.avance = 0;
    this.tareasEjecutadas = 0;
    this.tareasTotal = 0;
    this.avanceObra = 0;
    this.porcentajePagado = 0;
    this.reset = false;
    this.status = -1;
  }

  ngOnInit(): void {
    this.loadStorage();
  }


  public loadStorage() {
    this.identity = this._userService.getIdentity();
    this.getProyecto();
  }

  getProyecto(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.proyecto = response.data;
            this.getInspeccionesByProyecto();
            this.loadTareas(id);
          } else {
            console.log('AQUI');
            //this._router.navigate(['']);
          }
        },
        error => {
          console.log(error);
          //this._router.navigate(['']);
        }
      );
    });
  }

  getInspeccionesByProyecto(): any {
    console.log(this.proyecto.id);
    this._proyectoService.getInspecciones(this.proyecto.id).subscribe(
      response => {
        console.log(response);
        if (response.status == "success") {
          this.inspecciones = response.data;
        }
      },
      error => {
        console.log(<any>error);
      }

    );


  }

  existeNI(): any {
    let existe = 0;
    console.log(this.inspecciones);
    for (let i in this.inspecciones) {
      if (this.inspecciones[i].numero == this.inspeccion.numero) {
        existe = existe + 1;
      }
    }
    if (existe > 0) {
      return true;
    }
    return false;

  }

  insertLogCreate(proyectoid: number, texto: string) {
    this.log = new Log(0, proyectoid, this.identity.nombreUsuario, "Se ha generado la inspeccion " + texto, "");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response => {
      },
      error => {
        console.log(error);
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
      },
      error => {
        console.log(error);
      }
    );
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
          this.modificar(a);
        }
      },

      error => {
        console.log(error);
      }
    );

  }
  modificar(a: any) {
    let counter = timer(5000);
    console.log("VALOR", a);
    if (a <= 100) {
      this.tarea.avance = a;
      this._tareaService.update(this.tarea).subscribe(
        response => {
          if (response.code == 200) {
            this.loadTareas(this.tarea.proyecto_id);
            this.status = 2;
            counter.subscribe(n => {
              console.log(n);
              this.status = -1;
            });
          }
        },

        error => {
          console.log(error);
        }
      );
    } else {
      this.status = 3;
      counter.subscribe(n => {
        console.log(n);
        this.status = -1;
      });
    }


  }


  loadPorcentajePagado(id: number) {
    this._proyectoService.getPagos(id).subscribe(
      response => {
        console.log(response.data);
        let pagado = 0;
        this.pagos = response.data;
        this.pagos.forEach((p: any) => {
          pagado = pagado + p.monto;
        })
        this.porcentajePagado = (this.pagos / this.proyecto.monto_adjudicado) * 100;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: any) {
    let counter = timer(5000);
    this.inspeccion.user_id = this.identity.sub;
    this.inspeccion.proyecto_id = this.proyecto.id;
    this.inspeccion.avance_obra = this.avanceObra;
    this.inspeccion.porcentaje_pagado = this.porcentajePagado;
    this.inspeccion.tareas_ejecutadas = this.tareasEjecutadas;

    if (!this.existeNI()) {
      this._inspeccionService.registro(this.inspeccion).subscribe(
        response => {
          if (response.code == 200) {
            this.insertLogCreate(this.inspeccion.proyecto_id, " Numero : " + this.inspeccion.numero + " | Avance Obra: " + this.avanceObra);
            console.log(response.data);
            form.reset();
            this.getUltimo();

           
          }
        },
        error => {
          console.log(<any>error);

        }

      );
    } else {
      this.status = 1;
      counter.subscribe(n => {
        console.log(n);
        this.status = -1;
      });
    }

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

  imageUploaded(response: any) {
    this.foto = new Fotos(0, 0, "");
    let t = this.fotos.length;
    console.log("ACA", response.body.image);

    if (response.body.code == 200) {
      let data = response.body;
      console.log("Foto", data.image);
      this.foto.nombre = data.image;
      this.foto.id = t + 1;
      this.fotos.push(this.foto);
     
    } else {
      //mensaje
    }
    console.log("FOTOS", this.fotos);
    console.log(response);
  }


  docUploaded(response: any) {
    this.archivo = new Archivos(0, 0, "");
    let t = this.archivos.length;
    if (response.body.code == 200) {

      console.log("ACA2", response.body);

      let data = response.body;
      this.archivo.nombre = data.file;
      this.archivo.id = t + 1;
      this.archivos.push(this.archivo);

    } else {

    }
    console.log(response);
  }

  getUltimo() {
    let inspeccion1;
    this._inspeccionService.getUltimo().subscribe(
      response => {
        if (response.code == 200) {
          inspeccion1 = response.data;
          this.foto.inspeccion_id = inspeccion1.id;
          this.archivo.inspeccion_id = inspeccion1.id;
          if (this.foto.nombre != "") {
            this.onSubmit2();
          }
          if (this.archivo.nombre != "") {
            this.onSubmit3();
          }
          
          this._router.navigate(['/inspeccion-list', this.inspeccion.proyecto_id]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  onSubmit2() {
    console.log("HOLAAA", this.fotos);
    for (let i in this.fotos) {
      this.fotos[i].inspeccion_id = this.foto.inspeccion_id;
      console.log("ONSUB2", this.fotos[i]);
      this._fotosService.registro(this.fotos[i]).subscribe(
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


  delete(id: any): void {
    let indice: any;
    let nombre:any;
    let counter = timer(5000); //AGREGAR MENSAJE

    indice = this.fotos.indexOf(id); // obtenemos el indice
    nombre=this.fotos[indice].nombre;
    this._fotosService.liberar(nombre).subscribe(
      response => {
        if (response.code == 200) {
          console.log("ELIMINADA CORRECTAMENTE");
          this.fotos.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
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

  delete2(id: number): void {
    let indice: any;
    let nombre:any;
    let counter = timer(5000); //AGREGAR MENSAJE

    indice = this.archivos.indexOf(id); // obtenemos el indice

    nombre=this.archivos[indice].nombre;
    this._archivosService.liberar(nombre).subscribe(
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
      
  }


}
