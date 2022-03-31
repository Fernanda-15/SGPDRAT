import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import{global} from '../../../services/global';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[UserService]
})
export class UserListComponent implements OnInit {

  public user:User;
  public users:any;
  public url:string;
  public times: any;
  constructor(
    private _userService:UserService
  ) { 
    this.url=global.urlApi;
    this.user = new User(1,"","","usuario","","","","")
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void{
    this._userService.getUsers().subscribe(
      response=>{
        console.log(response);
        this.users=response.data;
      },
      error=>{
        this.users=null;
        console.log("Error");
      }
    );
  }

  delete(id:number):void{
    this._userService.deleteUser(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadUsers();
        }
        else{
          console.log(response);
        }

      },
      error=>{
        console.log(error);
      }
    );
  }

}
