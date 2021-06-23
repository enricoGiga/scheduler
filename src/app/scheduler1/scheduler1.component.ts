import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  ActionEventArgs,
  EventRenderedArgs,
  EventSettingsModel,
  ScheduleComponent,
  View
} from "@syncfusion/ej2-angular-schedule";
import {defaultData} from "../datasource";

@Component({
  selector: 'app-scheduler1',
  templateUrl: './scheduler1.component.html',
  styleUrls: ['./scheduler1.component.css']
})
export class Scheduler1Component implements OnInit, AfterViewInit {
  public selectedDate: Date = new Date(2021, 6, 11);
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = {dataSource: defaultData};
  @ViewChild('scheduleObj') scheduleObj: any;
  public currentView: View = 'Week';

  ngAfterViewInit(): void {

    console.log(this.scheduleObj)
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  onEventRender($event: EventRenderedArgs) {
    console.log($event);
  }

  onActionBegin($event: ActionEventArgs) {
    console.log($event)
  }


  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
}
