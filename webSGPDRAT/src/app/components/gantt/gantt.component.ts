import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { GanttEditorComponent, GanttEditorOptions } from "ng-gantt";
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import{Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'gantt-component',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
  providers: [TareaService,
    ProyectoService]
})
export class GanttComponent implements OnInit {

  public proyecto:Proyecto;
  public userName:string;
  public tareas:any;
  public tareasGantt:any;

  @ViewChild("editor") editor: GanttEditorComponent;
  public editorOptions: GanttEditorOptions;
  public data: any;

  constructor(
    public fb: FormBuilder,
    private _proyectoService:ProyectoService,
    private _tareaService:TareaService,
    private _route:ActivatedRoute, 
    private _router:Router,) {
    this.editorOptions = new GanttEditorOptions;
    this.editor = new GanttEditorComponent;
    this.proyecto = new Proyecto(0,0,"","","","","","","",0);
    this.userName = "";
  }


  getProyecto():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.proyecto=response.data;
            this.data = [{
              pID: 1,
              pName: this.proyecto.nombre,
              pStart: this.proyecto.fecha_inicio,
              pEnd: this.proyecto.fecha_final,
              pClass: "ggroupblack",
              pLink: "",
              pMile: 0,
              pRes: "N/A",
              pComp: 0,
              pGroup: 1,
              pParent: 0,
              pOpen: 1,
              pDepend: "",
              pCaption: "",
              pNotes: this.proyecto.objetivo
            }];
            console.log(this.data);
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

  loadTareas(id:number):void{
    let contador = 11;
    this._proyectoService.getTareas(id).subscribe(
      response=>{
          this.tareas = response.data;
          this.tareasGantt = [];
            this.tareas.forEach((t:any) => {
              this.tareasGantt.push({
                pID: contador,
                pName: t.descripcion,
                pStart: t.fecha_inicio,
                pEnd: t.fecha_final,
                pClass: "gmilestone",
                pLink: "",
                pMile: 1,
                pRes: "N/A",
                pComp: 100,
                pGroup: 0,
                pParent: 1,
                pOpen: 1,
                pDepend: "",
                pCaption: "",
                pNotes: ""
              })
              contador +=1;
            })
            this.data = this.data.concat(this.tareasGantt);
            
          },
      error=>{
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getProyecto();
    this.editorOptions = {
      vFormat: "day",
      vEditable: true,
      vEventsChange: {
        taskname: () => {
          console.log("taskname");
        }
      }
    };
  }


  changeData() {
    this.data = [... this.data,
      { pID: Math.random() * 100,
      
        pName: "new item", }];
  }


  initialData() {
    return [
      {
        pID: 1,
        pName: "Define Chart API",
        pStart: "",
        pEnd: "",
        pClass: "ggroupblack",
        pLink: "",
        pMile: 0,
        pRes: "Brian",
        pComp: 0,
        pGroup: 1,
        pParent: 0,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: "Some Notes text"
      },
      {
        pID: 11,
        pName: "Chart Object",
        pStart: "2017-02-20",
        pEnd: "2017-02-20",
        pClass: "gmilestone",
        pLink: "",
        pMile: 1,
        pRes: "Shlomy",
        pComp: 100,
        pGroup: 0,
        pParent: 1,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
      {
        pID: 12,
        pName: "Chart Object",
        pStart: "2017-02-20",
        pEnd: "2017-02-20",
        pClass: "gmilestone",
        pLink: "",
        pMile: 1,
        pRes: "Dreck",
        pComp: 100,
        pGroup: 0,
        pParent: 1,
        pOpen: 1,
        pDepend: "",
        pCaption: "",
        pNotes: ""
      },
    ];
  }
}
