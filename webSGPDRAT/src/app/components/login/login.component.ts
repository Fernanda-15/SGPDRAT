import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { UserService } from 'src/app/services/user.service';
import{Router} from '@angular/router';
import {User} from '../../models/user';
import{timer} from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    UserService]
})
export class LoginComponent implements OnInit {

  public status:number;
  public user:User;
  private token:any;
  private identity:any;

  constructor(
    private _userService: UserService,
    private _router:Router,
  ) { 
    this.status=-1;
    this.user = new User(0,"","","","","","","","");
    if(this._userService.getIdentity() != null){
      this._router.navigate(['']);
      }
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.signin(this.user).subscribe(
      response=>{
        if(response.status!="error"){
          this.token=response;
          localStorage.setItem("token",this.token);
          this._userService.getToken();

          this._userService.loadIdentity().subscribe(
            response=>{
              this.identity=JSON.stringify(response);
              localStorage.setItem("identity",this.identity);
            },
            error=>{
              let counter=timer(5000);
                this.status=1;
                counter.subscribe(n=>{
                  this.status=-1;
                });
              this.identity=null;
            }
          );

          form.reset();
          this._router.navigate(['']);

        }
      },
      error=>{
        let counter=timer(5000);
        if(error.status==500){
          this.status=0;
          counter.subscribe(n=>{
            this.status=-1;
          });
        }
        this.status=-1;
      }
    );
  }

  

}