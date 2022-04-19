import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import{Router,ActivatedRoute} from '@angular/router';


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

  constructor(
    private _userService: UserService,
    private _router:Router,
  ) {
    this.status=-1;
    this.user = new User(0,"","","usuario","","","","");
   }

  /*ngOnInit(): void {
    console.log(this._userService.test());
  }*/

  ngOnInit(): void {
    console.log('COMPONENTE DE REGISTRO')
  }

  onSubmit(form:any){
    console.log(this.user);
    this._userService.registro(this.user).subscribe(
     response=>{
      console.log(response);
        if(response.status == "success"){
          this.status = 0;
          form.reset();
          this._router.navigate(['/user-list']);

         }else{
                  this.status=1;
               }
       },
      error=>{
        this.status = 1;
       console.log(<any>error);

      }
   );
  }


 }


