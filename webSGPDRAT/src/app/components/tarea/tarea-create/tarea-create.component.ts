import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import{Router,ActivatedRoute} from '@angular/router';
import { Tarea } from 'src/app/models/tarea';
import{timer} from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tarea-create',
  templateUrl: './tarea-create.component.html',
  styleUrls: ['./tarea-create.component.css'],
  providers: [
    ProyectoService,
    TareaService,
    LogService,
  UserService]
})
export class TareaCreateComponent implements OnInit {

  public proyecto:Proyecto;
  public tarea:Tarea;
  public tareas:any;
  public status:number;
  public identity:any;
  private log:Log;

  constructor(
    private _proyectoService: ProyectoService, 
    private _tareaService: TareaService,
    private _userService: UserService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _logService: LogService,
  ) { 
    this.status=-1;
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.tarea=new Tarea(0,0,0,"",0,0,"","");
    this.log = new Log(0,0,"","","");
  }

  ngOnInit(): void {
    this.loadStorage();
    this.getProyecto();
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
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


  insertLogCreate(proyectoid:number,texto:string){
    this.log = new Log(0,proyectoid,this.identity.nombreUsuario,"Se ha creado la tarea "+texto,"");
    console.log(this.log);
    this._logService.registro(this.log).subscribe(
      response=>{
      },
      error=>{
        console.log(error);
      }
    );
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
      return true;
    }
    return false;
    
  }

  pesoTarea():any{
    let total:number=0;
    let subt:number=0;
    for(let i in this.tareas){
      total= total + (this.tareas[i].peso);
    }
    console.log("TOTAL", total);
   if(total < 100){
     subt= total + (this.tarea.peso);
     
     if(subt<=100){
      return true;
     }
   }
   return false;
  }


  onSubmit(form:any){ 
  let counter=timer(5000);
  this.tarea.proyecto_id=this.proyecto.id;
  console.log(this.proyecto.id);
    if(this.tarea.fecha_final >= this.tarea.fecha_inicio){
      if((this.tarea.fecha_inicio >= this.proyecto.fecha_inicio) && (this.tarea.fecha_inicio <= this.proyecto.fecha_final)){ //FECHA INICIO DE TAREA CON EL PROYECTO
       if((this.tarea.fecha_final <= this.proyecto.fecha_final) && (this.tarea.fecha_final >= this.proyecto.fecha_inicio)){ //FECHA FINAL DE TAREA CON EL PROYECTO
        if(!this.existeNT()){ //Verificar que en el proyecto no exista una tarea con ese numero 
          if(this.pesoTarea()){ //Verifica que el peso de las tareas no pase 100
            this._tareaService.registro(this.tarea).subscribe(
              response=>{
               console.log(response);
                 if(response.status == "success"){
                  this.insertLogCreate(this.tarea.proyecto_id,"Numero "+this.tarea.numero+": "+this.tarea.descripcion+ " | Peso: "+this.tarea.peso + " | Avance: "+this.tarea.avance);
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
            this.status=5;
            counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
          }
       
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
