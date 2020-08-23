import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';
import { DashboardRoutingModule } from "./dashboard-routing.module";


import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [DashboardRoutingModule],
  exports: [RouterModule]
})
export class DashboardModule { }
