import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Fotos } from "../models/fotos";

@Injectable()
export class FotosService{
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(fotos:any) : Observable<any>{
        let json = JSON.stringify(fotos);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      console.log(fotos);
        return this._http.post(this.url+'fotos', params, {headers: headers});
    }

    public getComentarios():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'fotos',{headers:httpHeaders});
    }

    public deleteComentario(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'fotos/'+id,{headers:httpHeaders});
    }

    getComentario(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'fotos/'+id , {headers:httpHeaders});
    }

    update(fotos:Fotos):Observable<any>{
        let json=JSON.stringify(fotos);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'fotos/'+fotos.id,params,{headers:httpHeaders});
    }

}