import {Observable} from "rxjs";
import{Injectable} from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import{global} from './global';
import { User } from "../models/user";


@Injectable() export class UserRegisterService{

    private url:string;
    public identity:any;
    
    constructor(public _http:HttpClient){
      this.url=global.urlApi; //ahora si
     
    }
  
    
  }