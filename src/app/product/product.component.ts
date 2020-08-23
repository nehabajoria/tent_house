import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IProduct } from '../interface/product';
import { ITransaction } from '../interface/transaction'
import { ProductService } from './../service/product.service';
import { TransactionService } from './../service/transaction-service';
import { CustomerService } from './../service/customer.service';
import { ICustomer } from './../interface/customer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: IProduct[]
  productForm: FormGroup
  selectedProductId: number;
  productModalRef: BsModalRef;
  selectedProduct: IProduct;
  orderModalRef: BsModalRef;
  orderForm: FormGroup;
  orderValidation: boolean = false;
  customers: ICustomer[];

  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    private bsModalService: BsModalService,
    private transactionService: TransactionService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getProducts();

    // build your form group
    this.productForm = this._formBuilder.group({
      id: [null],
      productTitle: [null, [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required]],
      quantityTotal: [0, [Validators.required,]],
      booked: [0, [Validators.required]],
    });

    this.orderForm = this._formBuilder.group({
      quantity: [0, [Validators.required]],
      customer: [1, [Validators.required]]
    });

    this.getCustomerList();
  }

  getCustomerList(): void {
    this.customerService.list().subscribe(
      data => {
        this.customers = data;
        console.log("data: ", data);
      },
      error => console.log("error in fetching customer list: ", error),
    );
  }

  getProducts(): void {
    this.productService.list()
        .subscribe(products => {
          console.log(products);
          this.products = products
        });
  }

  addProduct(): void {
    console.log(this.productForm);
  }

  editProduct(): void {
    let newProductRecord = <IProduct>{
      productTitle: this.productForm.get('productTitle').value,
      price: this.productForm.get('price').value,
      quantityTotal: this.productForm.get('quantityTotal').value,
      booked: this.productForm.get('booked').value,
    };
    this.productService.save(this.selectedProductId, newProductRecord).subscribe(
      data => {
        this.getProducts();
        console.log("One product Edited");
      },
      error => {
        console.log("There is an error-" + error)
      }
    )
  }

  deleteProduct(id: number): void {
    this.productService.deleteById(this.selectedProductId).subscribe(
      data => {
        this.getProducts();
        console.log("One product deleted");
      },
      error => {
        console.log("There is an error-" + error)
      }
    )
  }

  openOrderModal(template: TemplateRef<any>, selectedProduct: IProduct): void{
    this.selectedProduct = selectedProduct;
    this.orderForm.get('quantity').setValue(this.selectedProduct.quantityTotal);
    this.orderModalRef = this.bsModalService.show(template, {class: 'modal-sm'})
  }

  add(): void | boolean {
    var flag = this.maxOrderValidator();

    if(!flag) {
      this.orderValidation = true;
      return false;
    }

    var order = <ITransaction>{
      date: new Date(),
      customerId: this.orderForm.get('customer').value,
      productId: this.selectedProduct.id,
      transactionType: "out",
      quantity: this.orderForm.get('quantity').value,
      parentTransactionId: 0
    };

    console.log(order);
    this.transactionService.create(order).subscribe(
      data => {
        this.saveProductQuantityChange();
        console.log("order create");
      },
      error => {
        console.log("There is an error" + error)
      }
    )
    this.orderModalRef.hide();
  }

  saveProductQuantityChange(): void {
    var selectedProduct = this.selectedProduct;;

    let newProductRecord = <IProduct>{
      productTitle: selectedProduct.productTitle,
      price: selectedProduct.price,
      quantityTotal: selectedProduct.quantityTotal - this.orderForm.get('quantity').value,
      booked: selectedProduct.booked + this.orderForm.get('quantity').value,
    };
    this.productService.save(selectedProduct.id, newProductRecord).subscribe(
      data => {
        this.getProducts();
        console.log("One product Edited");
      },
      error => {
        console.log("There is an error-" + error)
      }
    )

    
    this.selectedProduct = null;
  }

  close(): void {
    console.log("close");

    this.selectedProduct = null;
    this.orderModalRef.hide();
  }

  openDeleteModal(template: TemplateRef<any>, id: number): void{
    this.selectedProductId = id;
    this.productModalRef = this.bsModalService.show(template, {class: 'modal-sm'})
  }

  confirm(): void {
    this.deleteProduct(this.selectedProductId);
    this.selectedProductId = null;
    this.productModalRef.hide();
  }

  decline(): void {
    this.selectedProductId = null;
    this.productModalRef.hide();
  }

  openProductModal(template: TemplateRef<any>, thisProduct: IProduct) {
    this.selectedProduct = thisProduct;
    if (!thisProduct) {
      this.productForm.get('productTitle').setValue(null);
      this.productForm.get('price').setValue(null);
      this.productForm.get('quantityTotal').setValue(null);
      this.productForm.get('booked').setValue(null);
    } else {
      this.productForm.get('productTitle').setValue(thisProduct.productTitle);
      this.productForm.get('price').setValue(thisProduct.price);
      this.productForm.get('quantityTotal').setValue(thisProduct.quantityTotal);
      this.productForm.get('booked').setValue(thisProduct.booked);
    }
    this.productModalRef = this.bsModalService.show(template, {class: 'modal-sm'});
  }

  onSubmit(): void {
    console.log("customer: ", this.productForm.value);
    let newProductRecord = <IProduct>{
      productTitle: this.productForm.get('productTitle').value,
      price: this.productForm.get('price').value,
      quantityTotal: this.productForm.get('quantityTotal').value,
      booked: this.productForm.get('booked').value,
    };
    if (!this.selectedProduct) {
      this.productService.create(newProductRecord).subscribe(
        data => {
          console.log("new data: ", data);
          this.getProducts();
          this.productModalRef.hide();
        },
        error => {
          console.log("error in creating customer record: ", error);
        }
      );
    } else {
      this.productService.save(this.selectedProduct.id, newProductRecord).subscribe(
        data => {
          console.log("save changes: ", data);
          this.getProducts();
          this.productModalRef.hide();
        },
        error => {
          console.log("error in saving changes to customer record: ", error);
        }
      );
    }
  }

  maxOrderValidator(): boolean {
    var selectedProduct = this.selectedProduct;
    var productObj = this.products.filter(x => x.id === selectedProduct.id);
    var orderedQuantity = this.orderForm.get('quantity').value;

    if (orderedQuantity <= productObj[0].quantityTotal) {
      return true;
    } else {
      return false;
    }
  }

}
