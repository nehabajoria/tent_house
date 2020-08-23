import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHTTPInterceptor } from './../service/http.interceptor';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionService } from './../service/transaction-service';
import { ProductService } from './../service/product.service';
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
    TransactionRoutingModule  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHTTPInterceptor,
      multi: true
    },
    TransactionService,
    ProductService,
    CustomerService
  ],
})
export class TransactionModule { }
