import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {User} from '../../../models/user';
import{Router,ActivatedRoute} from '@angular/router';
import{global} from '../../../services/global';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers:[UserService]
})
export class UserUpdateComponent implements OnInit {

  public user:any;
  public url:string;
  public status: any;
  public reset=false;
  public is_edit:boolean=false;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
    ) {
    this.url=global.urlApi;
    this.is_edit=true;
   }

  ngOnInit(): void {
    this.reset=false;
    this.user=new User(1,"","","usuario","","","","","");
    this.getUser();
  }

  getUser(){
    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._userService.getUser(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.user=response.data;
          }else{
            this._router.navigate(['']);
          }
        },
        error=>{
         this._router.navigate(['']); //CAE AQUI AL SELECCIONAR USUARIO
        }
      );
    });
  }

  onSubmit(form:any):void{
    this._userService.update(this.user).subscribe(
      response=>{
     if(response.code==200){
      this.status=0;
      this._router.navigate(['/user-list']);
      }else{
        this.status=1;
        this.reset=true;
      }
      },

      error=>{
        console.log(error);
        this.status=1;
      }
    );

  }



}
