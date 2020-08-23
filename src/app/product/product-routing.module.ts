import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';

const routes: Routes = [{ path: '', component: ProductComponent }];

@NgModule({
  imports: 
  [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
