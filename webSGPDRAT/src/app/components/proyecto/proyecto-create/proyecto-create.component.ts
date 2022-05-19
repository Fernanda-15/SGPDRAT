import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UserService } from 'src/app/services/user.service';
import{Router} from '@angular/router';
import{timer} from 'rxjs';

@Component({
  selector: 'app-proyecto-create',
  templateUrl: './proyecto-create.component.html',
  styleUrls: ['./proyecto-create.component.css'],
  providers: [
    ProyectoService,
    UserService]
})
export class ProyectoCreateComponent implements OnInit {

  
  public proyecto:Proyecto;
  public status:number;
  public reset=false;
  public users:any;
  constructor(
    private _proyectoService: ProyectoService, 
    private _userService: UserService,
    private _router:Router,
  ) { 
    this.status=-1;
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
  }

  ngOnInit(): void {
    console.log('COMPONENTE DE CREACION DE PROYECTO');
    
    this.getUsers();
  }


  getUsers(){
    this._userService.getUsers().subscribe(
      response=>{
        if(response.code==200){
          this.users=response.data;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  onSubmit(form:any){ 
    let counter=timer(5000);
    if(this.proyecto.fecha_final >= this.proyecto.fecha_inicio){
      if(this.proyecto.user_id > 0){
        if(this.proyecto.forma_pago != ""){
          this._proyectoService.registro(this.proyecto).subscribe(
            response=>{
            console.log(response);
              if(response.status == "success"){
                form.reset(); 
                this._router.navigate(['/proyecto-list']);
                }else{
                        this.status=0;
                        counter.subscribe(n=>{
                          console.log(n);
                          this.status=-1;
                        });
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
