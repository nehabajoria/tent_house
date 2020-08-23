import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRoutingModule } from './product/product-routing.module';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerRoutingModule } from './customer/customer-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionRoutingModule } from './transaction/transaction-routing.module';
import { LoginService } from './service/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    TransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    CustomerRoutingModule,
    BrowserAnimationsModule,
    TransactionRoutingModule,
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
