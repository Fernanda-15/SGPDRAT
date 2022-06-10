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

@Component({
  selector: 'app-inspeccion-update',
  templateUrl: './inspeccion-update.component.html',
  styleUrls: ['./inspeccion-update.component.css'],
  providers: [InspeccionService, FotosService, ArchivosService, LogService,
    UserService]
})
export class InspeccionUpdateComponent implements OnInit {

  public foto: Fotos;
  public inspeccion: Inspeccion;
  public archivo: Archivos;
  public identity: any;
  public status: number;
  public reset: any;
  private log: Log;

  constructor(
    private _inspeccionService: InspeccionService,
    private _fotosService: FotosService,
    private _archivosService: ArchivosService,
    private _logService: LogService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.inspeccion = new Inspeccion(0, 0, 0, 0, "", "", "", 0, 0, 0);
    this.foto = new Fotos(0, 0, "");
    this.archivo = new Archivos(0, 0, "");
    this.status = -1;
    this.reset = false;
    this.log = new Log(0, 0, "", "", "");
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
          }
        },
        error => {
          this._router.navigate(['']);
        }
      );
    });
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
    console.log("ACA", response.body.image);

    if (response.body.code == 200) {
      let data = response.body;
      console.log("Foto", data.image);
      this.foto.nombre = data.image;
      this.foto.inspeccion_id = this.inspeccion.id;

    } else {

    }
    console.log(response);
  }


  docUploaded(response: any) {
    if (response.body.code == 200) {

      console.log("ACA2", response.body);

      let data = response.body;
      this.archivo.nombre = data.file;

      this.archivo.inspeccion_id = this.inspeccion.id;

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
    this._fotosService.registro(this.foto).subscribe(
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

  onSubmit3() {
    this._archivosService.registro(this.archivo).subscribe(
      response => {
        if (response.code == 200) {
          console.log("SUCCESS UPLOAD ARCHIVO");
        }
      },
      error => {
        console.log(<any>error);

      }

    );
  }
}
