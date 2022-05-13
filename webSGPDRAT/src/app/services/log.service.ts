import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Log } from "../models/log";

@Injectable()
export class LogService{
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(log:any) : Observable<any>{
        let json = JSON.stringify(log);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      console.log(log);
        return this._http.post(this.url+'log', params, {headers: headers});
    }

    public getLogs():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'log',{headers:httpHeaders});
    }

    public deleteLog(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'log/'+id,{headers:httpHeaders});
    }

    getLog(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'log/'+id , {headers:httpHeaders});
    }

    update(log:Log):Observable<any>{
        let json=JSON.stringify(log);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'log/'+log.id,params,{headers:httpHeaders});
    }

}