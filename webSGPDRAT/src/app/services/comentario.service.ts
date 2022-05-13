import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Comentario } from "../models/comentario";

@Injectable()
export class ComentarioService{
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(comentario:any) : Observable<any>{
        let json = JSON.stringify(comentario);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      console.log(comentario);
        return this._http.post(this.url+'comentario', params, {headers: headers});
    }

    public getComentarios():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'comentario',{headers:httpHeaders});
    }

    public deleteComentario(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'comentario/'+id,{headers:httpHeaders});
    }

    getComentario(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'comentario/'+id , {headers:httpHeaders});
    }

    update(comentario:Comentario):Observable<any>{
        let json=JSON.stringify(comentario);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'comentario/'+comentario.id,params,{headers:httpHeaders});
    }

}