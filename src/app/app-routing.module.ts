import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {Scheduler1Component} from "./scheduler1/scheduler1.component";


const routes: Routes = [
  { path: '', redirectTo: '/scheduler', pathMatch: 'full' },
  { path: 'scheduler', component: Scheduler1Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
