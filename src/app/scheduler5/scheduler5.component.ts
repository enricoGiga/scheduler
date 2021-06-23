import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  ScheduleComponent, View, RenderCellEventArgs, EventRenderedArgs, MonthService,
  DayService, WeekService, WorkWeekService, EventSettingsModel, TimelineMonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { scheduleData } from './data';
@Component({
  selector: 'app-scheduler5',
  templateUrl: './scheduler5.component.html',
  styleUrls: ['./scheduler5.component.css']
})
export class Scheduler5Component  {

  // @ts-ignore
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
  public currentView: View = 'Week';
  public selectedDate: Date = new Date(2019, 0, 10);
  public instance: Internationalization = new Internationalization();


  constructor() {
  }

  getWeatherImage(value: Date): string | null {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
      case 1:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
      case 2:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
      case 3:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
      case 4:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
      case 5:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
      case 6:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
      default:
        return null;
    }
  }

  getDateHeaderText(value: any): string {
    return this.instance.formatDate(value.date, { skeleton: 'Ed' });
  }

  OnRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'monthCells' && this.currentView === 'Month') {
      let ele: Element = document.createElement('div');
      // @ts-ignore
      ele.innerHTML = this.getWeatherImage(args.date);
      // @ts-ignore
      (args.element).appendChild(ele.firstChild);
    }
  }

  onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
}
