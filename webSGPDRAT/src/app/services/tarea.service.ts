import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Tarea } from "../models/tarea";



@Injectable()
export class TareaService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(tarea:any) : Observable<any>{
        let json = JSON.stringify(tarea);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      console.log(tarea);
        return this._http.post(this.url+'tarea', params, {headers: headers});
    }
  
    public getTareas():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'tarea',{headers:httpHeaders});
    }

    public deleteTarea(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'tarea/'+id,{headers:httpHeaders});
    }

    getTarea(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'tarea/'+id , {headers:httpHeaders});
    }

    
    update(tarea:Tarea):Observable<any>{
        let json=JSON.stringify(tarea);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'tarea/'+tarea.id,params,{headers:httpHeaders});
      }
}