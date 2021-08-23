import {View} from "@syncfusion/ej2-angular-schedule";
import {WorkHoursModel} from "@syncfusion/ej2-schedule/src/schedule/models/models";

export interface TimeScale {
  enable: boolean,
  interval: number,
  slotCount: number
}

export interface SchedulerStructure {
  workDays: number[],
  workHours: WorkHoursModel
  startHour: string,
  endHour: string
  selectedDate: Date,
  currentView: View,
  timeScale: TimeScale
  views: View[],
}


