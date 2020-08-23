import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';

import { TransactionComponent } from './transaction.component';
import { transition } from '@angular/animations';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent
  }
];

@NgModule({
  imports: 
  [
    RouterModule.forChild(routes), 
    CommonModule
  ],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
