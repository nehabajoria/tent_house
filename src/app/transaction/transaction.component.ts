import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ITransaction } from '../interface/transaction'
import { TransactionService } from './../service/transaction-service';
import { IProduct } from '../interface/product';
import { ProductService } from './../service/product.service';
import { ICustomer } from './../interface/customer';
import { CustomerService } from './../service/customer.service';


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: ITransaction[]
  selectedTransactionId: number;
  reverseForm: FormGroup;
  reverseModelRef: BsModalRef;
  selectedTransaction: ITransaction;
  products: IProduct[];
  customers: ICustomer[];

  constructor(
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService,
    private productService: ProductService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(
  ): void {
    this.getTransactionList();
    this.getProductList();
    this.getCustomerList();
    this.reverseForm = this.formBuilder.group({
      quantity: [null, [Validators.required]]
    })
  }

  getTransactionList(): void {
    this.transactionService.list()
        .subscribe(transactions => {
          console.log(transactions);
          this.transactions = transactions

          if(this.products && this.customers) {
            this.fillTransactionJsonData();
          }
        });
  }

  getProductList(): void {
    this.productService.list()
        .subscribe(products => {
          console.log(products);
          this.products = products
        });
  }

  getCustomerList(): void {
    this.customerService.list().subscribe(
      data => {
        this.customers = data;
        console.log("data: ", data);
        this.fillTransactionJsonData();
      },
      error => console.log("error in fetching customer list: ", error),
    );
  }

  fillTransactionJsonData(): void {
    for(var indx = 0; indx < this.transactions.length; indx++) {
      var data = this.transactions[indx];
      var customerId = data.customerId;
      var productId = data.productId;

      var customerObj = this.customers.filter(customer => customer.id == customerId);
      var productObj = this.products.filter(product => product.id == productId);
console.log(customerObj);
console.log(productObj)
      data["customerName"] = customerObj[0].name;
      data["productName"] = productObj[0].productTitle;
    }
  }

  openReverseModel(template: TemplateRef<any>, selectedTransaction: ITransaction): void{
    this.selectedTransaction = selectedTransaction;
    this.reverseForm.get('quantity').setValue(this.selectedTransaction.quantity);
    this.reverseModelRef = this.bsModalService.show(template, {class: 'modal-sm'})
  }

  save(): void | boolean {
    if(!this.maxOrderValidator()) {
      alert("Return quantity can not greated than booked quantity");
      this.reverseModelRef.hide();
      return false;
    }

    var transaction = <ITransaction>{
      date: new Date(),
      customerId: this.selectedTransaction.customerId,
      productId: this.selectedTransaction.productId,
      transactionType: "In",
      quantity: this.reverseForm.get('quantity').value,
      parentTransactionId: this.selectedTransaction.id
    };
    console.log(transaction + "--transaction");
    
    console.log(this.reverseForm.get('quantity').value + "--transaction");

    var oldTransaction = <ITransaction>{
      date: new Date(),
      customerId: this.selectedTransaction.customerId,
      productId: this.selectedTransaction.productId,
      transactionType: "Out",
      quantity: this.selectedTransaction.quantity - this.reverseForm.get('quantity').value,
      parentTransactionId: 0
    };

    console.log(oldTransaction + "--transactionObj");
    this.transactionService.create(transaction).subscribe(
      data => {
        console.log("transaction reverse create");
        this.saveProductQuantityChange();
      },
      error => {
        console.log("There is an error" + error)
      }
    )

    this.transactionService.save(this.selectedTransaction.id, oldTransaction).subscribe(
      data => {
        console.log("transaction reverse create");
        this.getTransactionList();
      },
      error => {
        console.log("There is an error" + error)
      }
    )

    this.reverseModelRef.hide();
  }

  saveProductQuantityChange(): void {
    var transaction = this.selectedTransaction;
    var productObj = this.products.filter(x => x.id === transaction.productId);

    let returnProductRecord = <IProduct>{
      productTitle: productObj[0].productTitle,
      price: productObj[0].price,
      quantityTotal: productObj[0].quantityTotal + this.reverseForm.get('quantity').value,
      booked: productObj[0].booked - this.reverseForm.get('quantity').value,
    };

    this.productService.save(transaction.productId, returnProductRecord).subscribe(
      data => {
        console.log("One product Edited");
      },
      error => {
        console.log("There is an error-" + error)
      }
    )

    this.selectedTransaction = null;
  }

  close(): void {
    this.selectedTransaction = null;
    this.reverseModelRef.hide();
  }

  convert():void{    
    var doc = new jsPDF();
    var col = [["#", "Date", "Transaction Type", "Quantity"]];
    var rows = [];

    for ( var i = 0, l = this.transactions.length; i < l; i++ ) {
      var trans = this.transactions[i];
      var temp = [trans.id, trans.date, trans.transactionType, trans.quantity];
      rows.push(temp);
    }

    autoTable(doc, {
      head: col,
      body: rows,
      didDrawCell: (data) => {
        console.log(data.column.index)
      },
    })
    doc.save('table.pdf')
  }

  maxOrderValidator(): boolean {
    var selectedTransaction = this.selectedTransaction;
    var transactionObj = this.transactions.filter(x => x.id === selectedTransaction.id);
    var quantity = this.reverseForm.get('quantity').value;

    if (quantity <= transactionObj[0].quantity) {
      return true;
    } else {
      return false;
    }
  }
}
