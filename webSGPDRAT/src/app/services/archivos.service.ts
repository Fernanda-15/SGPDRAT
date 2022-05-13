import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Archivos } from "../models/archivos";

@Injectable()
export class ArchivosService{
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(archivos:any) : Observable<any>{
        let json = JSON.stringify(archivos);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log(archivos);
        return this._http.post(this.url+'archivos', params, {headers: headers});
    }

    public getarchivoss():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'archivos',{headers:httpHeaders});
    }

    public deletearchivos(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'archivos/'+id,{headers:httpHeaders});
    }

    getarchivos(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'archivos/'+id , {headers:httpHeaders});
    }

    update(archivos:Archivos):Observable<any>{
        let json=JSON.stringify(archivos);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'archivos/'+archivos.id,params,{headers:httpHeaders});
    }

}