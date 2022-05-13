import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Inspeccion } from "../models/inspeccion";

@Injectable()
export class InspeccionService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(inspeccion:any) : Observable<any>{
        let json = JSON.stringify(inspeccion);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log("SERVICE");
      console.log(inspeccion);
        return this._http.post(this.url+'inspeccion', params, {headers: headers});
    }
  
    public getProyectos():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'inspeccion',{headers:httpHeaders});
    }

    getProyecto(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'inspeccion/'+id , {headers:httpHeaders});
    }

    getTareas(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'tarea/inspeccion/'+id , {headers:httpHeaders});
    }

    public deleteProyecto(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'inspeccion/'+id,{headers:httpHeaders});
    }

    update(inspeccion:Inspeccion):Observable<any>{
        let json=JSON.stringify(inspeccion);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'inspeccion/'+inspeccion.id,params,{headers:httpHeaders});
      }
}