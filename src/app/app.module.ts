import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MonthService, ScheduleModule, WeekService} from "@syncfusion/ej2-angular-schedule";
import { Scheduler1Component } from './scheduler1/scheduler1.component';
import {AppRoutingModule} from "./app-routing.module";
import { Scheduler2Component } from './scheduler2/scheduler2.component';
import { Scheduler3Component } from './scheduler3/scheduler3.component';
import {DateTimePickerAllModule} from "@syncfusion/ej2-angular-calendars";
import {DropDownListAllModule} from "@syncfusion/ej2-angular-dropdowns";
import { Scheduler4Component } from './scheduler4/scheduler4.component';
import {ButtonAllModule} from "@syncfusion/ej2-angular-buttons";
import { Scheduler5Component } from './scheduler5/scheduler5.component';
import {ContextMenuModule, TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import {Scheduler6Component} from "./scheduler6/scheduler6.component";
import { ContextalMenuComponent } from './contextal-menu/contextal-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    Scheduler1Component,
    Scheduler2Component,
    Scheduler3Component,
    Scheduler4Component,
    Scheduler5Component,
    Scheduler6Component,
    ContextalMenuComponent
  ],
    imports: [
        BrowserModule, ScheduleModule, AppRoutingModule, DateTimePickerAllModule, DropDownListAllModule, ButtonAllModule, TreeViewModule, ContextMenuModule
    ],
  providers: [WeekService,
    MonthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
