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
  
    
}