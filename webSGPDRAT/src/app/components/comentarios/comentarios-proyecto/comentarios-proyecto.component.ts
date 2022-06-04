import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import { ComentarioService } from 'src/app/services/comentario.service';
import { Comentario } from 'src/app/models/comentario';
import {Router,ActivatedRoute} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';

@Component({
  selector: 'app-comentarios-proyecto',
  templateUrl: './comentarios-proyecto.component.html',
  styleUrls: ['./comentarios-proyecto.component.css'],
  providers: [ComentarioService,
  ProyectoService]
})
export class ComentariosProyectoComponent implements OnInit {

  public comentarios:any[]=[];
  public comentario:Comentario;
  public proyecto:Proyecto;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 5;
  public status:number = -1;

  constructor(
    private _proyectoService:ProyectoService,
    private _comentarioService:ComentarioService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.comentario = new Comentario(0,0,"","");
   }

  ngOnInit(): void {
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
            this.loadComentarios(id);
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


  loadComentarios(id:number):void{
    this._proyectoService.getComentarios(id).subscribe(
      response=>{
          this.comentarios = response.data;
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


  onSubmit(id:number,a:any){
    let counter=timer(5000);
    this.comentario.proyecto_id=id;
    this.comentario.contenido=a;
    this._comentarioService.registro(this.comentario).subscribe(
      response=>{
        if(response.code==200){
          this.loadComentarios(this.comentario.proyecto_id);
          this.status=1;
            counter.subscribe(n=>{
             console.log(n);
             this.status=-1;
           });
         }
      },

      error=>{
        console.log(error);
        this.status=0;
            counter.subscribe(n=>{
             console.log(n);
             this.status=-1;
           });
      }
    );

  }
}
