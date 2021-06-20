import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MonthService, ScheduleModule, WeekService} from "@syncfusion/ej2-angular-schedule";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ScheduleModule
  ],
  providers: [WeekService,
    MonthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
