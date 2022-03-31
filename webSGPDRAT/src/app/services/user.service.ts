import { Inject, Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.urlApi;
    }

    test(){
        return "Probando servicio";
    }

    registro(user:any) : Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log("SERVICE");
      console.log(user);
        return this._http.post(this.url+'user', params, {headers: headers});
    }

    public getUsers():Observable<any>{
        //console.log(this.token);
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
        return this._http.get(this.url+'user',{headers:httpHeaders});
    }

    public deleteUser(id:number) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'user/'+id,{headers:httpHeaders});
    }

    getUser(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'user/'+id , {headers:httpHeaders});
      }

    update(user:User):Observable<any>{
        let json=JSON.stringify(user);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'user/'+user.id,params,{headers:httpHeaders});
      }

  
    
    
}