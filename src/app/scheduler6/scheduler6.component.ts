import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  DayService,
  DragAndDropService, DragEventArgs,
  EventRenderedArgs,
  EventSettingsModel,
  MonthService,
  PopupOpenEventArgs, ResizeEventArgs,
  ResizeService,
  ScheduleComponent,
  View,
  WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {extend, Internationalization} from '@syncfusion/ej2-base';
import {timelineData} from "./data";
import {DragAndDropEventArgs, TreeView} from "@syncfusion/ej2-angular-navigations";
import {Element} from "@angular/compiler";
import {CellClickEventArgs} from "@syncfusion/ej2-schedule/src/schedule/base/interface";

@Component({
  selector: 'app-scheduler6',
  templateUrl: './scheduler6.component.html',
  styleUrls: ['./scheduler6.component.css'],
  providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class Scheduler6Component {
  @ViewChild('scheduleObj')
  // @ts-ignore
  public scheduleObj: ScheduleComponent;
  // @ts-ignore
  public eventSettings: EventSettingsModel = {
    dataSource: <Object[]>extend([], timelineData, undefined, true)
    , fields: {
      subject: {name: 'Title', title: 'Enter Title'},
      endTime: {name: 'end'},
      startTime: {name: 'start'}
    }
  };
  public selectedDate: Date = new Date(2018, 1, 15);
  public showQuickInfo: boolean = false;
  public statusFields: Object = {text: 'StatusText', value: 'StatusText'};
  public StatusData: Object[] = [
    {StatusText: 'New', Id: 1},
    {StatusText: 'Requested', Id: 2},
    {StatusText: 'Confirmed', Id: 3}
  ];
  currentView: View = 'Month';

  public waitingList: { [key: string]: Object }[] = [
    {
      Id: 1,
      Name: 'Enrico',

    },
    {
      Id: 3,
      Name: 'Angelica'
    },
    {
      Id: 3,
      Name: 'Mario'
    },
  ];

  fields: Object = {dataSource: this.waitingList, id: 'Id', text: 'Name'};
  views: View[]  = ['Week', 'Day']; // by default they are all

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

  onResizeStart($event: ResizeEventArgs) {
    // $event.scroll!.enable = false
    // $event.scroll!.scrollBy = 500
    $event.interval = 10
  }

  onDragStart($event: DragEventArgs) {
    // $event.scroll!.enable = false
    // $event.scroll!.scrollBy = 500
    $event.interval = 10
    //$event.excludeSelectors = 'e-work-cells'
  }


  onNodeDragStop($event: DragAndDropEventArgs) {
    debugger;
    const cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails($event.target);
    const eventData: Record<string, any> = {
      Title: $event.draggedNodeData.text,
      start: cellDetails.startTime,
      end: cellDetails.endTime,
      IsAllDay: cellDetails.isAllDay
    }
    this.scheduleObj.addEvent(eventData)
  }
  public instance: Internationalization = new Internationalization();
  getDateHeaderText: Function = (value: Date) => {
    return this.instance.formatDate(value, { skeleton: "Ed" });
  };
}
