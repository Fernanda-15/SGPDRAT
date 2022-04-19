import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import {Tarea} from '../../../models/tarea';
import{Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tarea-update',
  templateUrl: './tarea-update.component.html',
  styleUrls: ['./tarea-update.component.css'],
  providers: [TareaService]
})
export class TareaUpdateComponent implements OnInit {

  public tarea:any;
  public status: any;
  public reset=false;

  constructor(
    private _tareaService:TareaService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.reset=false;
    this.tarea=new Tarea(0,0,0,"",0,0,"","");
    this.getTarea();
  }



  
  getTarea():void{

    this._route.params.subscribe(params=>{

      let id=params['id'];
      console.log(id);
      this._tareaService.getTarea(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.tarea=response.data;
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



  onSubmit(form:any):void{
    this._tareaService.update(this.tarea).subscribe(
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
