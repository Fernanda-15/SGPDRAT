import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";



class events{

  id:string;
  start:DayPilot.Date;
  end:DayPilot.Date;
  text:string;

  constructor(id:string,start:DayPilot.Date,end:DayPilot.Date,text:string){
    this.id=id;
    this.start=start;
    this.end=end;
    this.text=text;
  }
}

@Injectable()
export class DataService {

  tareas:any;

  id:any;

  events: any[] = [
    {
      id: "1",
      start: DayPilot.Date.today().addHours(10),
      end: DayPilot.Date.today().addHours(12),
      text: "Event 1"
    }
  ];

  constructor(private http : HttpClient,){
  }


  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        console.log(this.events);
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

}