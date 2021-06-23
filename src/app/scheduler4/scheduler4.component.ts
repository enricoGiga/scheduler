import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import {
  ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, AgendaService,
  MonthAgendaService, ResourcesModel, CellClickEventArgs, CurrentAction, EventSettingsModel, EJ2Instance
} from '@syncfusion/ej2-angular-schedule';
import { quickInfoTemplateData } from './data';
import {TextBoxComponent} from "@syncfusion/ej2-angular-inputs";

@Component({
  selector: 'app-scheduler4',
  templateUrl: './scheduler4.component.html',
  styleUrls: ['./scheduler4.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
  encapsulation: ViewEncapsulation.None
})
export class Scheduler4Component{
  @ViewChild('scheduleObj')  // @ts-ignore
  public scheduleObj: ScheduleComponent;
  @ViewChild('eventTypeObj')  // @ts-ignore
  public eventTypeObj: DropDownListComponent;
  @ViewChild('titleObj') // @ts-ignore
  public titleObj: TextBoxComponent;
  @ViewChild('notesObj') // @ts-ignore
  public notesObj: TextBoxComponent;  // @ts-ignore
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], quickInfoTemplateData, null, true) };
  public selectedDate: Date = new Date(2020, 0, 9);
  public intl: Internationalization = new Internationalization();
  public roomFields: Object = { text: 'Name', value: 'Id' };
  public roomData: Object[] = [
    { Name: 'Jammy', Id: 1, Capacity: 20, Color: '#ea7a57', Type: 'Conference' },
    { Name: 'Tweety', Id: 2, Capacity: 7, Color: '#7fa900', Type: 'Cabin' },
    { Name: 'Nestle', Id: 3, Capacity: 5, Color: '#5978ee', Type: 'Cabin' },
    { Name: 'Phoenix', Id: 4, Capacity: 15, Color: '#fec200', Type: 'Conference' },
    { Name: 'Mission', Id: 5, Capacity: 25, Color: '#df5286', Type: 'Conference' },
    { Name: 'Hangout', Id: 6, Capacity: 10, Color: '#00bdae', Type: 'Cabin' },
    { Name: 'Rick Roll', Id: 7, Capacity: 20, Color: '#865fcf', Type: 'Conference' },
    { Name: 'Rainbow', Id: 8, Capacity: 8, Color: '#1aaa55', Type: 'Cabin' },
    { Name: 'Swarm', Id: 9, Capacity: 30, Color: '#df5286', Type: 'Conference' },
    { Name: 'Photogenic', Id: 10, Capacity: 25, Color: '#710193', Type: 'Conference' }
  ];

  constructor() {

  }

  public getResourceData(data: { [key: string]: Object }): { [key: string]: Object } {
    // tslint:disable-next-line: deprecation
    const resources: ResourcesModel = this.scheduleObj.getResourceCollections()[0];
    // @ts-ignore
    const resourceData: { [key: string]: Object } = (resources.dataSource as Object[]).filter((resource: { [key: string]: Object }) =>
      resource.Id === data.RoomId)[0] as { [key: string]: Object };
    return resourceData;
  }


  public getHeaderStyles(data: { [key: string]: Object }): Object {
    if (data.elementType === 'cell') {
      return { 'align-items': 'center', 'color': '#919191' };
    } else {
      const resourceData: { [key: string]: Object } = this.getResourceData(data);
      return { 'background': resourceData.Color, 'color': '#FFFFFF' };
    }
  }

  public getHeaderTitle(data: { [key: string]: Object }): string {
    return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
  }

  public getHeaderDetails(data: { [key: string]: Date }): string {
    return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
      this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';

  }

  public getEventType(data: { [key: string]: string }): string {
    const resourceData: { [key: string]: Object } = this.getResourceData(data);
    return resourceData.Name as string;
  }

  public buttonClickActions(e: Event) {
    const quickPopup: HTMLElement = this.scheduleObj.element.querySelector('.e-quick-popup-wrapper') as HTMLElement;
    const getSlotData: Function = (): { [key: string]: Object } => {
      const cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
      const addObj: { [key: string]: Object } = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.Description = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      addObj.RoomId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      return addObj;
    };
    if ((e.target as HTMLElement).id === 'add') {
      const addObj: { [key: string]: Object } = getSlotData();
      this.scheduleObj.addEvent(addObj);
    } else if ((e.target as HTMLElement).id === 'delete') {
      const eventDetails: { [key: string]: Object } = this.scheduleObj.activeEventData.event as { [key: string]: Object };
      let currentAction: CurrentAction;
      if (eventDetails.RecurrenceRule) {
        currentAction = 'DeleteOccurrence';
      }  // @ts-ignore
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {  // @ts-ignore
      const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
      const eventDetails: { [key: string]: Object } = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event as { [key: string]: Object };
      let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'EditOccurrence';
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }

}
