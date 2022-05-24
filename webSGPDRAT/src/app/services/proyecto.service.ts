import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Proyecto } from "../models/proyecto";

@Injectable()
export class ProyectoService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(proyecto:any) : Observable<any>{
        let json = JSON.stringify(proyecto);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log("SERVICE");
      console.log(proyecto);
        return this._http.post(this.url+'proyecto', params, {headers: headers});
    }
  
    public getProyectos():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'proyecto',{headers:httpHeaders});
    }

    getProyecto(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'proyecto/'+id , {headers:httpHeaders});
    }

    getTareas(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'tarea/proyecto/'+id , {headers:httpHeaders});
    }

    getPagos(id:number):Observable<any>{ 
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'pago/proyecto/'+id , {headers:httpHeaders});
    }

    getProyectosByU(id:number):Observable<any>{ 
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'proyecto/user/'+id , {headers:httpHeaders});
    }

    getLogs(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'log/proyecto/'+id , {headers:httpHeaders});
    }

    getComentarios(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'comentario/proyecto/'+id , {headers:httpHeaders});
    }

    public getUltimo():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'proyecto/getultimo',{headers:httpHeaders});
    }

    public deleteProyecto(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'proyecto/'+id,{headers:httpHeaders});
    }

    update(proyecto:Proyecto):Observable<any>{
        let json=JSON.stringify(proyecto);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'proyecto/'+proyecto.id,params,{headers:httpHeaders});
      }
}