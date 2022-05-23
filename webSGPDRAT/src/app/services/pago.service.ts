import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Pago } from "../models/pago";

@Injectable()
export class PagoService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    registro(pago:any) : Observable<any>{
        let json = JSON.stringify(pago);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log("SERVICE");
      console.log(pago);
        return this._http.post(this.url+'pago', params, {headers: headers});
    }


    public deletePago(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'pago/'+id,{headers:httpHeaders});
    }

    update(pago:Pago):Observable<any>{
        let json=JSON.stringify(pago);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'pago/'+pago.id,params,{headers:httpHeaders});
    }

    public getPago(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'pago/'+id,{headers:httpHeaders});
    }
}