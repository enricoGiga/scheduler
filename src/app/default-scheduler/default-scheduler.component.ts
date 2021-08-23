import {Component} from '@angular/core';
import {
  AgendaService,
  DayService,
  DragAndDropService,
  EventSettingsModel,
  MonthService,
  ResizeService,
  View,
  WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {extend} from "@syncfusion/ej2-base";
import {scheduleData} from "../contextal-menu/data";
import {SchedulerStructure} from "../model/scheduler-structure";

@Component({
  selector: 'app-default-scheduler',
  templateUrl: './default-scheduler.component.html',
  styleUrls: ['./default-scheduler.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]

})
export class DefaultSchedulerComponent {
  public schedulerStructure: SchedulerStructure = {
    currentView: "Week",
    startHour: '07:00',
    endHour: '20:00',
    workHours : {
      start: '09:00',
      end: '18:00'
    },

    timeScale: {enable: true, interval: 60, slotCount: 4},
    views: ['Day', 'Week', 'WorkWeek'],
    workDays: [1, 2, 3, 4, 5],
    selectedDate: new Date(2019, 0, 10)
  };

  public selectedDate: Date = new Date(2019, 0, 10);

  public currentView: View = 'Week';

  public eventSettings: EventSettingsModel =
    {dataSource: <Object[]>extend([], scheduleData, undefined, true)};



}
