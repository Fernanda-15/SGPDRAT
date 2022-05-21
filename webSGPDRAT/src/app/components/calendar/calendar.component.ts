import {Component,Input, ViewChild, AfterViewInit} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "./data.service";
import{Router,ActivatedRoute} from '@angular/router';
import {ProyectoService} from "../../services/proyecto.service";
import {Proyecto} from "../../models/proyecto";
import {TareaService} from '../../services/tarea.service';
import {Tarea} from '../../models/tarea';
import { expand } from "rxjs";

@Component({
  selector: 'calendar-component',
  template: `
    <div class="container">
      <div class="navigator">
        <daypilot-navigator [config]="configNavigator" [events]="events" [(date)]="date" (dateChange)="changeDate($event)" #navigator></daypilot-navigator>
      </div>
      <div class="content">
        <div class="buttons">
        <button (click)="viewDay()" [class]="this.configNavigator.selectMode == 'Day' ? 'selected' : ''">Día</button>
        <button (click)="viewWeek()" [class]="this.configNavigator.selectMode == 'Week' ? 'selected' : ''">Semana</button>
        <button (click)="viewMonth()" [class]="this.configNavigator.selectMode == 'Month' ? 'selected' : ''">Mes</button>
        </div>

        <daypilot-calendar [config]="configDay" [events]="events" #day></daypilot-calendar>
        <daypilot-calendar [config]="configWeek" [events]="events" #week></daypilot-calendar>
        <daypilot-month [config]="configMonth" [events]="events" #month></daypilot-month>
      </div>
    </div>

  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }

    .navigator {
      margin-right: 10px;
    }

    .content {
      flex-grow: 1;
    }

    .buttons {
      margin-bottom: 10px;
    }

    button {
      background-color: #3c78d8;
      color: white;
      border: 0;
      padding: .5rem 1rem;
      width: 80px;
      font-size: 14px;
      cursor: pointer;
      margin-right: 5px;
    }

    button.selected {
      background-color: #1c4587;
    }

  `]
})
export class CalendarComponent implements AfterViewInit {

  public proyecto:Proyecto;
  public tarea:Tarea;
  public tareas:any;
  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 5,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: args => {
      //this.loadEvents();
    }
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",
  };

  configMonth: DayPilot.MonthConfig = {
    eventHeight: 110,
    cellHeight: 100
  };

  constructor(
    private ds: DataService,
    private _route:ActivatedRoute, 
    private _router:Router,
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,) 
    {
    this.viewMonth();
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.tarea = new Tarea(0,0,0,"",0,0,"","");
  }

  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.loadTareas(this.proyecto.id);
          }else{
            console.log('AQUI');
            //this._router.navigate(['']);
          }
        },
        error=>{
          console.log(error);
         //this._router.navigate(['']); 
        }
      );
    });
  }

  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
  
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }
  loadTareas(id:number):void{
    this._proyectoService.getTareas(id).subscribe(
      response=>{
          this.tareas = response.data;
          console.log(this.tareas);
          this.tareas.forEach((t:any) => {
            this.events.push({
              id: t.numero.toString(),
              start: new DayPilot.Date(t.fecha_inicio).addHours(+(t.fecha_inicio[11]+t.fecha_final[12])),
              end: new DayPilot.Date(t.fecha_final),
              text: "Tarea #"+t.numero + " | " + t.descripcion + " | Avance: " + t.avance + "%" + " | Peso: " + t.peso
            })
          })
          console.log(this.events);
      },
      error=>{
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.getProyecto();
  }

  viewDay():void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek():void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth():void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }


}

