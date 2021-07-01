import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ActionEventArgs,
  DayService,
  DragAndDropService,
  EventRenderedArgs,
  EventSettingsModel,
  MonthService,
  PopupOpenEventArgs, RenderCellEventArgs,
  ResizeService,
  ScheduleComponent,
  WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {extend} from '@syncfusion/ej2-base';
import {doctorsEventData} from "./data";
import {WorkHoursModel} from "@syncfusion/ej2-schedule/src/schedule/models/models";

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
  public showQuickInfo: boolean = true;
  public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
  public StatusData: Object[] = [
    { StatusText: 'New', Id: 1 },
    { StatusText: 'Requested', Id: 2 },
    { StatusText: 'Confirmed', Id: 3 }
  ];
  worksHours: WorkHoursModel = {
    start: '7:00',
    end: '18:00'
  }
  public dateParser(data: string) {
    return new Date(data);
  }
  public onEventRendered(args: EventRenderedArgs): void {
    args.element.children[1].getElementsByClassName('e-subject')[0].textContent = 'Ciao'
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
  public onActionBegin(args: ActionEventArgs): void {
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
  onRenderCell(args: RenderCellEventArgs): void {
    // if (args.elementType === "workCells" && args.date!.getTime() <= new Date().getTime() && !args.element.classList.contains("e-disable-dates")) {
    //   args.element.classList.add("e-disable-dates");
    //   args.element.classList.add("e-disable-cell");
    // }
  }
  onPopUpOpen($event: PopupOpenEventArgs) {

    const data: Record<string, any> | undefined = $event.data;
    let newVar: Date = data!['StartTime'];
    if ( newVar.getDate() === 13 && newVar.getMonth() === 1){

      $event.cancel = true
    }
    console.log($event)
  }
  getCellContent(date: Date): string {

    if (this.scheduleObj.activeView.viewClass === 'e-month-view' && date.getMonth() === 1 && date.getDate() === 11) {
      return '<img src="../../assets/schedule/images/christmas.svg" /><div class="caption">Thanksgiving day</div>';
    }
    return '';
  }
}
