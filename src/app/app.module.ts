import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CommonModule} from "@angular/common";
import {RecurrenceEditorAllModule, ScheduleAllModule} from "@syncfusion/ej2-angular-schedule";
import {DropDownListAllModule, MultiSelectAllModule} from "@syncfusion/ej2-angular-dropdowns";
import {ButtonAllModule, CheckBoxAllModule, SwitchAllModule} from "@syncfusion/ej2-angular-buttons";
import {
  MaskedTextBoxModule,
  NumericTextBoxAllModule,
  TextBoxAllModule,
  UploaderAllModule
} from "@syncfusion/ej2-angular-inputs";
import {DatePickerAllModule, DateTimePickerAllModule, TimePickerAllModule} from "@syncfusion/ej2-angular-calendars";
import {ContextMenuAllModule, ToolbarAllModule, TreeViewModule} from "@syncfusion/ej2-angular-navigations";

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, ScheduleAllModule, RecurrenceEditorAllModule, NumericTextBoxAllModule, TextBoxAllModule, DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule,
    CheckBoxAllModule, ToolbarAllModule, DropDownListAllModule, ContextMenuAllModule,
    MaskedTextBoxModule, UploaderAllModule, MultiSelectAllModule, TreeViewModule, ButtonAllModule, SwitchAllModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
