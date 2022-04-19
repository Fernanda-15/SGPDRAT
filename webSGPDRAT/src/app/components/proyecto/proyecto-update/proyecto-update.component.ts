import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import {Proyecto} from '../../../models/proyecto';
import{Router,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-proyecto-update',
  templateUrl: './proyecto-update.component.html',
  styleUrls: ['./proyecto-update.component.css'],
  providers: [ProyectoService, UserService]
})
export class ProyectoUpdateComponent implements OnInit {

  public proyecto:any;
  public status: any;
  public reset=false;
  public users:any;
  constructor(
    private _proyectoService:ProyectoService,
    private _userService: UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    this.reset=false;
    this.proyecto=new Proyecto(0,0,"","","","","","","",0);
    this.getProyecto();
    this.getUsers();
  }

  getProyecto():void{

    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
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

  onSubmit(form:any):void{
    this._proyectoService.update(this.proyecto).subscribe(
      response=>{
     if(response.code==200){
      this.status=0;
      this._router.navigate(['/proyecto-list']);
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
