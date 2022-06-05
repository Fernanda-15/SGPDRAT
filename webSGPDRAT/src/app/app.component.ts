import { Component ,DoCheck} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import{Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService]
})

export class AppComponent {
  title = 'Sistema de Gestión de Proyectos DRAT';

  public identity:any;
  private token:any;
  private times:number;

  constructor(
    public _userService:UserService,
    private _router:Router,
  )
  {
    this.loadStorage();
    if(this.identity==null){
      this.identity = {
        sub : "null",
        rol : "null"
      }
    }
    if(this.identity.rol == "null"){
    this._router.navigate(['login']);
    }
    this.times=0;
  }

  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(){
    this.times=0;
   }

   ngDoCheck(): void {
     this.times++;
     if(this.times>0.1){
       this.loadStorage();
       this.times=0;
     }
     if(this.identity==null){
      this.identity = {
        sub : "null",
        rol : "null"
      }
    }
   }


}
