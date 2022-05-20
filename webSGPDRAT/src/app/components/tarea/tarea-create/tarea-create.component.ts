import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Tarea } from 'src/app/models/tarea';
import{timer} from 'rxjs';

@Component({
  selector: 'app-tarea-create',
  templateUrl: './tarea-create.component.html',
  styleUrls: ['./tarea-create.component.css'],
  providers: [
    ProyectoService,
    TareaService]
})
export class TareaCreateComponent implements OnInit {

  public proyecto:Proyecto;
  public tarea:Tarea;
  public tareas:any;
  public status:number;

  constructor(
    private _proyectoService: ProyectoService, 
    private _tareaService: TareaService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.status=-1;
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.tarea=new Tarea(0,0,0,"",0,0,"","");
  }

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{

      let id=params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.getTareasByProyecto();
          }else{
            this._router.navigate(['']);
          }
        },
        error=>{
         this._router.navigate(['']); 
        }
      );
    });
  }

  getTareasByProyecto():any{
    console.log(this.proyecto.id);
    this._proyectoService.getTareas(this.proyecto.id).subscribe(
      response=>{
        console.log(response);
          if(response.status == "success"){
            this.tareas = response.data;
           }
         },
        error=>{
         console.log(<any>error);
        }
        
     );

     
  }

  existeNT():any{
    let existe=0;
    console.log(this.tareas); 
    for(let i in this.tareas){
      if(this.tareas[i].numero == this.tarea.numero){
        existe = existe+1;
      }
    }
    if(existe>0){
      this.status=4;
      return true;
    }
    
  }

  onSubmit(form:any){ 
  let counter=timer(5000);
  this.tarea.proyecto_id=this.proyecto.id;
  console.log(this.proyecto.id);
    if(this.tarea.fecha_final >= this.tarea.fecha_inicio){
      if((this.tarea.fecha_inicio >= this.proyecto.fecha_inicio) && (this.tarea.fecha_inicio <= this.proyecto.fecha_final)){ //FECHA INICIO DE TAREA CON EL PROYECTO
       if((this.tarea.fecha_final <= this.proyecto.fecha_final) && (this.tarea.fecha_final >= this.proyecto.fecha_inicio)){ //FECHA FINAL DE TAREA CON EL PROYECTO
        if(!this.existeNT()){
          this._tareaService.registro(this.tarea).subscribe(
            response=>{
             console.log(response);
               if(response.status == "success"){
                 this.status = -1;
                 form.reset(); 
                  this._router.navigate(['/tarea-list',this.tarea.proyecto_id]);
                 
                }
                if(response.code == 500){
                    this.status=0;
                }
              },
              error=>{
              this.status = 0;
              console.log(<any>error);
              
             }
          );
        }else{
          this.status=4;
          counter.subscribe(n=>{
          console.log(n);
          this.status=-1;
        });
        }
       
       }else{
        this.status=3;
        counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
       }

      }else{
        this.status=2;
        counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
      }
   
    }else{
      this.status=1;
      counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
    }
    
  }
}
