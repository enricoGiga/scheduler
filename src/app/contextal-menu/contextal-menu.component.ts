import {Component, ViewChild, Inject, ViewEncapsulation, HostListener} from '@angular/core';
import {extend, closest, isNullOrUndefined, remove, removeClass} from '@syncfusion/ej2-base';
import {DataManager, Query} from '@syncfusion/ej2-data';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ScheduleComponent,
  CellClickEventArgs, PopupOpenEventArgs, SelectEventArgs
} from '@syncfusion/ej2-angular-schedule';
import {
  ContextMenuComponent,
  MenuItemModel,
  BeforeOpenCloseMenuEventArgs,
  MenuEventArgs
} from '@syncfusion/ej2-angular-navigations';
import {scheduleData} from "./data";
import * as moment from 'moment';
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-contextal-menu',
  templateUrl: './contextal-menu.component.html',
  styleUrls: ['./contextal-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class ContextalMenuComponent {
  // @ts-ignore
  eventObjCopied: Record<string, Object>;

  // @ts-ignore
  selectedAppointment: Record<string, any> | Record<string, any>[] | undefined;
  copiedControlCAppointemnt: Record<string, any> | Record<string, any>[] | undefined;

  isSelectedAnAppoiment: boolean = true;
  isSelectedAWorkCell = false;
  // @ts-ignore
  selectedWorkCell: Record<string, any> | Record<string, any>[] | undefined;
  @ViewChild('scheduleObj')
  // @ts-ignore
  public scheduleObj: ScheduleComponent;
  @ViewChild('menuObj')
  // @ts-ignore
  public menuObj: ContextMenuComponent;
  public allowResizing = true;
  public allowDragDrop = true;
  public selectedDate: Date = new Date(2019, 0, 10);
  public eventSettings: EventSettingsModel = {dataSource: <Object[]>extend([], scheduleData, undefined, true)};
  // @ts-ignore
  public selectedTarget: Element;
  public menuItems: MenuItemModel[] = [
    {
      text: 'New Event',
      iconCss: 'e-icons new',
      id: 'Add'
    }, {
      text: 'New Recurring Event',
      iconCss: 'e-icons recurrence',
      id: 'AddRecurrence'
    }, {
      text: 'Today',
      iconCss: 'e-icons today',
      id: 'Today'
    }, {
      text: 'Edit Event',
      iconCss: 'e-icons edit',
      id: 'Save'
    }, {
      text: 'Edit Event',
      id: 'EditRecurrenceEvent',
      iconCss: 'e-icons edit',
      items: [{
        text: 'Edit Occurrence',
        id: 'EditOccurrence'
      }, {
        text: 'Edit Series',
        id: 'EditSeries'
      }]
    }, {
      text: 'Delete Event',
      iconCss: 'e-icons delete',
      id: 'Delete'
    },
    {
      text: 'Copy Event',
      iconCss: 'e-icons delete',
      id: 'Copy'
    },
    {
      text: 'Paste Event',
      iconCss: 'e-icons ',
      id: 'Paste'
    },
    {
      text: 'Delete Event',
      id: 'DeleteRecurrenceEvent',
      iconCss: 'e-icons ',
      items: [{
        text: 'Delete Occurrence',
        id: 'DeleteOccurrence'
      }, {
        text: 'Delete Series',
        id: 'DeleteSeries'
      }]
    }
  ];

  // constructor(@Inject('sourceFiles') private sourceFiles: any) {
  //   sourceFiles.files = ['contextal-menu.component.css'];
  // }

  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      // @ts-ignore
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    let targetElement: HTMLElement = <HTMLElement>args.event.target;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (this.selectedTarget.classList.contains('e-appointment')) {
      let eventObj: { [key: string]: Object } = <{ [key: string]: Object }>this.scheduleObj.getEventDetails(this.selectedTarget);
      if (eventObj.RecurrenceRule) {
        this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent', 'Copy'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        this.menuObj.showItems(['Save', 'Delete'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    }
    this.menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }

  onMenuItemSelect(args: MenuEventArgs): void {
    // @ts-ignore
    let selectedMenuItem: string = args.item.id;
    let eventObj: { [key: string]: Object };
    if (this.selectedTarget.classList.contains('e-appointment')) {
      eventObj = <{ [key: string]: Object }>this.scheduleObj.getEventDetails(this.selectedTarget);
    }
    switch (selectedMenuItem) {
      case 'Today':
        this.scheduleObj.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        let selectedCells: Element[] = this.scheduleObj.getSelectedElements();
        let activeCellsData: CellClickEventArgs =
          this.scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget);
        if (selectedMenuItem === 'Add') {
          this.scheduleObj.openEditor(activeCellsData, 'Add');
        } else {
          this.scheduleObj.openEditor(activeCellsData, 'Add', undefined, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {

          eventObj = <{ [key: string]: Object }>new DataManager(this.scheduleObj.eventsData).executeLocal(new Query().
            // @ts-ignore
            where(this.scheduleObj.eventFields.id, 'equal', eventObj[this.scheduleObj.eventFields.recurrenceID] as string | number))[0];
        }        // @ts-ignore

        // @ts-ignore
        this.scheduleObj.openEditor(eventObj, selectedMenuItem);
        break;
      case 'Delete':
        // @ts-ignore
        this.scheduleObj.deleteEvent(eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        // @ts-ignore
        this.scheduleObj.deleteEvent(eventObj, selectedMenuItem);
        break;

      case 'Copy':
        // @ts-ignore
        this.eventObjCopied = eventObj;
        break;
      //this.scheduleObj.addEvent(eventObj)
      case 'Paste':
        // @ts-ignore
        if (this.eventObjCopied) {
          let selectedCells: Element[] = this.scheduleObj.getSelectedElements();
          let activeCellsData: CellClickEventArgs =
            this.scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget);
          console.log(activeCellsData.startTime)
          // @ts-ignore
          const momentStartDate = moment(activeCellsData.startTime);

          // calcolo la differenza
          const start = moment(this.eventObjCopied.StartTime);
          const end = moment(this.eventObjCopied.EndTime)
          var duration = moment.duration(end.diff(start));
          var hours = duration.asHours();


          this.eventObjCopied.StartTime = momentStartDate.toDate();
          this.eventObjCopied.EndTime = momentStartDate.add(hours, 'hours').toDate();

          this.scheduleObj.addEvent({...this.eventObjCopied});

        }
        break;
    }

  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67) {

      console.log('CTRL + C');
      this.copiedControlCAppointemnt = this.selectedAppointment;
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86) {

      console.log('CTRL +  V');

      if (this.isSelectedAWorkCell && this.copiedControlCAppointemnt) {
        // @ts-ignore
        const momentStartDate = moment(this.selectedWorkCell.StartTime);

        // calcolo la differenza
        // @ts-ignore
        const start = moment(this.copiedControlCAppointemnt.StartTime);
        // @ts-ignore
        const end = moment(this.copiedControlCAppointemnt.EndTime)
        var duration = moment.duration(end.diff(start));
        var hours = duration.asHours();
        const newAppointemnt = {
          ...this.copiedControlCAppointemnt,
          StartTime: momentStartDate.toDate(),
          EndTime: momentStartDate.add(hours, 'hours').toDate()
        }


        this.scheduleObj.addEvent({...newAppointemnt});
      }
    }


  }


  onPopUpOpen($event: PopupOpenEventArgs) {
    $event.cancel = true
  }

  onSelect($event: SelectEventArgs) {

    // @ts-ignore
    if ($event.element.classList.contains('e-appointment')) {
      this.selectedAppointment = $event.data;
      this.isSelectedAnAppoiment = true;
      this.isSelectedAWorkCell = false;
      // @ts-ignore
    } else if ($event.element.classList.contains('e-work-cells')) {
      this.selectedWorkCell = $event.data;
      this.isSelectedAnAppoiment = false;
      this.isSelectedAWorkCell = true;
    }

  }
}
