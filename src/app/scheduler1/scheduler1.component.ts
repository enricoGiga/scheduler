import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  DayService,
  DragAndDropService,
  EventRenderedArgs,
  EventSettingsModel,
  MonthService,
  PopupOpenEventArgs,
  ResizeService,
  ScheduleComponent,
  WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {extend} from '@syncfusion/ej2-base';
import {doctorsEventData} from "./data";

@Component({
  selector: 'app-scheduler1',
  templateUrl: './scheduler1.component.html',
  styleUrls: ['./scheduler1.component.css'],
  providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class Scheduler1Component {
  @ViewChild('scheduleObj')
  // @ts-ignore
  public scheduleObj: ScheduleComponent;
  // @ts-ignore
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], doctorsEventData, null, true) };
  public selectedDate: Date = new Date(2018, 1, 15);
  public showQuickInfo: boolean = false;
  public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
  public StatusData: Object[] = [
    { StatusText: 'New', Id: 1 },
    { StatusText: 'Requested', Id: 2 },
    { StatusText: 'Confirmed', Id: 3 }
  ];
  public dateParser(data: string) {
    return new Date(data);
  }
  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data.EventType) {
      case 'Requested':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'Confirmed':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'New':
        (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
        break;
    }
  }
  public onActionBegin(args: { [key: string]: Object }): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: any;
      if (args.requestType === 'eventCreate') {
        // @ts-ignore
        data = <any>args.data[0];
      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
      }
      if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
        args.cancel = true;
      }
    }
  }

  onPopUpOpen($event: PopupOpenEventArgs) {
    console.log($event)
  }
}
