import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import{global} from '../../../services/global';
import { PageEvent } from '@angular/material/paginator';
import{timer} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[UserService]
})
export class UserListComponent implements OnInit {

  public user:User;
  public users: any[]=[];
  public url:string;
  public times: any;
  public i:number = 1 ;
  public desde:number = 0;
  public hasta:number = 5;
  public status:number;

  constructor(
    private _userService:UserService
  ) {
    this.url=global.urlApi;
    this.user = new User(1,"","","usuario","","","","","");
    this.status=-1;
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
        this.users=[];
        console.log("Error");
      }
    );
  }

  delete(id:number):void{
  let counter=timer(5000);
    this._userService.deleteUser(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.loadUsers();
          this.status=0;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
        }
        else{
          this.status=1;
          counter.subscribe(n=>{
            console.log(n);
            this.status=-1;
          });
          console.log(response);
        }

      },
      error=>{
        this.status=1;
        counter.subscribe(n=>{
          console.log(n);
          this.status=-1;
        });
        console.log(error);
      }
    );
  }

  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }

}
