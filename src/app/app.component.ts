import { Component } from '@angular/core';
import { WeekService, MonthService, WorkWeekService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import {defaultData} from "./datasource";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [WeekService, MonthService, WorkWeekService],
  // specifies the template string for the Schedule component
})
export class AppComponent {
  public selectedDate: Date = new Date(2021, 6, 11);
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = { dataSource: defaultData };
}
