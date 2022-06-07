import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import{Router,ActivatedRoute} from '@angular/router';
import{timer} from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers: [
    UserService]
})
export class UserRegisterComponent implements OnInit {

  public user:User;
  public status:number;
  public reset=false;
  public users:any[]=[];
  constructor(
    private _userService: UserService,
    private _router:Router,
  ) {
    this.status=-1;
    this.user = new User(0,"","","usuario","","","","","");
   }

  /*ngOnInit(): void {
    console.log(this._userService.test());
  }*/

  ngOnInit(): void {
    console.log('COMPONENTE DE REGISTRO');
    this.getUsers();
  }

  onSubmit(form:any){
  let counter=timer(5000);

    console.log(this.user);
    if(this.existeUs()){ //VERIDICAR SI EXISTE TAREA
      this._userService.registro(this.user).subscribe(
        response=>{
         console.log(response);
           if(response.status == "success"){
             form.reset();
             this._router.navigate(['/user-list']);
   
            }else{
                     this.status=1;
                     counter.subscribe(n=>{
                      console.log(n);
                      this.status=-1;
                    });
                  }
          },
         error=>{
           this.status = 1;
           counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
          console.log(<any>error);
   
         }
      );
    }else{
      this.status=2;
      counter.subscribe(n=>{
        console.log(n);
        this.status=-1;
      });
    }
   
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      response=>{
        console.log(response);
          if(response.status == "success"){
            this.users=response.data;
          }
         },
        error=>{
         this.status = 1;
         console.log(<any>error);
  
        }
    );
  }
  existeUs():any{
    console.log(this.users); 

    for(let i in this.users){
      if(this.users[i].nombreUsuario == this.user.nombreUsuario){
        return false;
      }else if(this.users[i].cedula == this.user.cedula){
        return false;
      }else if(this.users[i].correo == this.user.correo){
        return false;
      }
    }
   
    return true;
  }


 }


