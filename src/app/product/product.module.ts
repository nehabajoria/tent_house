import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerService } from './../service/customer.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHTTPInterceptor } from './../service/http.interceptor'
import { ProductService } from '../service/product.service';
import { TransactionService } from '../service/transaction-service';
import { CustomerService } from './../service/customer.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ProductRoutingModule  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHTTPInterceptor,
      multi: true
    },
    ProductService,
    TransactionService,
    CustomerService
  ],
})
export class ProductModule { }
