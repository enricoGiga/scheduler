import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MonthService, ScheduleModule, WeekService} from "@syncfusion/ej2-angular-schedule";
import { Scheduler1Component } from './scheduler1/scheduler1.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    Scheduler1Component
  ],
  imports: [
    BrowserModule, ScheduleModule, AppRoutingModule
  ],
  providers: [WeekService,
    MonthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
