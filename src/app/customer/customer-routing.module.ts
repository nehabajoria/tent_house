import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';

const routes: Routes = [{ path: '', component: CustomerComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule],
  declarations: [],
})
export class CustomerRoutingModule { }
