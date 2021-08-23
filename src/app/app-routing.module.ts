import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {Scheduler1Component} from "./scheduler1/scheduler1.component";
import {Scheduler2Component} from "./scheduler2/scheduler2.component";
import {Scheduler3Component} from "./scheduler3/scheduler3.component";
import {Scheduler4Component} from "./scheduler4/scheduler4.component";
import {Scheduler5Component} from "./scheduler5/scheduler5.component";
import {Scheduler6Component} from "./scheduler6/scheduler6.component";
import {ContextalMenuComponent} from "./contextal-menu/contextal-menu.component";
import {DefaultSchedulerComponent} from "./default-scheduler/default-scheduler.component";


const routes: Routes = [
  { path: '', redirectTo: '/default', pathMatch: 'full' },
  { path: 'scheduler', component: Scheduler1Component },
  { path: 'scheduler2', component: Scheduler2Component },
  { path: 'scheduler3', component: Scheduler3Component },
  { path: 'scheduler4', component: Scheduler4Component },
  { path: 'scheduler5', component: Scheduler5Component },
  { path: 'scheduler6', component: Scheduler6Component },
  { path: 'menucontestuale', component: ContextalMenuComponent },
  { path: 'default', component: DefaultSchedulerComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
