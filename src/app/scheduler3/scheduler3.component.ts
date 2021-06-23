import {Component, Inject, ViewChild, ViewEncapsulation} from '@angular/core';

import {addClass, extend} from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  View,
  GroupModel,
  ResourceDetails,
  TreeViewArgs,
  PopupOpenEventArgs,
  ScheduleComponent,
  ActionEventArgs,
  EventFieldsMapping,
  RenderCellEventArgs,
  MonthService,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import {doctorData} from "./data3";

@Component({
  selector: 'app-scheduler3',
  templateUrl: './scheduler3.component.html',
  styleUrls: ['./scheduler3.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MonthService, WorkWeekService]
})
export class Scheduler3Component {

  public data: Object[] = <Object[]>extend([], doctorData, undefined, true);
  public selectedDate: Date = new Date(2018, 3, 1);
  public currentView: View = 'WorkWeek';
  public allowResizing: boolean = false;
  public allowDragDrop: boolean = false;
  public resourceDataSource: Object[] = [
    {text: 'laura', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5], startHour: '08:00', endHour: '15:00'},
    {text: 'margaret', id: 2, color: 'rgb(53, 124, 210)', workDays: [1, 3, 5], startHour: '08:00', endHour: '17:00'},
    {text: 'robert', id: 3, color: '#7fa900', startHour: '08:00', endHour: '16:00'}
  ];
  public group: GroupModel = {resources: ['Doctors']};
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      subject: {title: 'Service Type', name: 'Subject'},
      location: {title: 'Patient Name', name: 'Location'},
      description: {title: 'Summary', name: 'Description'},
      startTime: {title: 'From', name: 'StartTime'},
      endTime: {title: 'To', name: 'EndTime'}
    }
  };

  // @ts-ignore
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  constructor() {
  }

  getDoctorName(value: ResourceDetails | TreeViewArgs): string {
    // @ts-ignore

    return ((value as ResourceDetails).resourceData) ?
      // @ts-ignore
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
      : (value as TreeViewArgs).resourceName;
  }

  getDoctorImage(value: ResourceDetails | TreeViewArgs): string {
    let resourceName: string = this.getDoctorName(value);
    return resourceName.replace(' ', '-').toLowerCase();
  }

  getDoctorLevel(value: ResourceDetails | TreeViewArgs): string {
    let resourceName: string = this.getDoctorName(value);
    return (resourceName === 'laura') ? 'Cardiologist' : (resourceName === 'robert') ? 'Neurologist' : 'Orthopedic Surgeon';
  }

  onActionBegin(args: ActionEventArgs): void {
    let isEventChange: boolean = (args.requestType === 'eventChange');
    if ((args.requestType === 'eventCreate' && (<Object[]>args.data).length > 0) || isEventChange) {

      let eventData: { [key: string]: Object } = (isEventChange) ? args.data as { [key: string]: Object } :
        // @ts-ignore
        args.data[0] as { [key: string]: Object };
      let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
      // @ts-ignore
      let startDate: Date = eventData[eventField.startTime] as Date;
      // @ts-ignore
      let endDate: Date = eventData[eventField.endTime] as Date;
      let resourceIndex: number = [1, 2, 3].indexOf(eventData.DoctorId as number);
      args.cancel = !this.isValidateTime(startDate, endDate, resourceIndex);
      if (!args.cancel) {
        args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
      }
    }
  }

  isValidateTime(startDate: Date, endDate: Date, resIndex: number): boolean {
    let resource: ResourceDetails = this.scheduleObj.getResourcesByIndex(resIndex);
    let startHour: number = parseInt(resource.resourceData.startHour.toString().slice(0, 2), 10);
    let endHour: number = parseInt(resource.resourceData.endHour.toString().slice(0, 2), 10);
    return (startHour <= startDate.getHours() && endHour >= endDate.getHours());
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.target && args.target.classList.contains('e-work-cells')) {
      args.cancel = !args.target.classList.contains('e-work-hours');
    }
  }

  onRenderCell(args: RenderCellEventArgs): void {
    if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
      // @ts-ignore
      addClass([args.element], ['laura', 'margaret', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
    }
  }
}
