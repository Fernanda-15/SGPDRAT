import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgGanttEditorModule } from 'ng-gantt'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GanttComponent } from './gantt.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgGanttEditorModule
    ],
  declarations: [
    GanttComponent
  ],
  exports : [GanttComponent]
})
export class GanttModule { }