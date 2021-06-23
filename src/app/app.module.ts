import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MonthService, ScheduleModule, WeekService} from "@syncfusion/ej2-angular-schedule";
import { Scheduler1Component } from './scheduler1/scheduler1.component';
import {AppRoutingModule} from "./app-routing.module";
import { Scheduler2Component } from './scheduler2/scheduler2.component';
import { Scheduler3Component } from './scheduler3/scheduler3.component';

@NgModule({
  declarations: [
    AppComponent,
    Scheduler1Component,
    Scheduler2Component,
    Scheduler3Component
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
