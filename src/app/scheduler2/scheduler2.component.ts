import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { blockData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService, DayService,
  ResizeService, DragAndDropService, ResourceDetails, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-scheduler2',
  templateUrl: './scheduler2.component.html',
  styleUrls: ['./scheduler2.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class Scheduler2Component {
  @ViewChild('scheduleObj') public scheduleObj: any;

  public data: Object[] = <Object[]>extend([], blockData, undefined, true);
  public selectedDate: Date = new Date(2018, 7, 1);
  public currentView: View = 'TimelineDay';
  public employeeDataSource: Object[] = [
    { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
    { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
    { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
    { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
    { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
    { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
  ];
  public group: GroupModel = { enableCompactView: false, resources: ['Employee'] };
  public allowMultiple: Boolean = false;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
  constructor() {

  }
  getEmployeeName(value: ResourceDetails): string {
    // @ts-ignore
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }
  getEmployeeDesignation(value: ResourceDetails): string {
    // @ts-ignore
    let resourceName: string = (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    return (value as ResourceDetails).resourceData.Designation as string;
  }
  getEmployeeImageName(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }
}
