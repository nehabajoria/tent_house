import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICustomer } from './../interface/customer';
import { CustomerService } from './../service/customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: ICustomer[];
  modalRef: BsModalRef;
  customerModalRef: BsModalRef;
  selectedCustomerID: number;
  selectedCustomer: ICustomer;
  customerForm: FormGroup;
  showDetail: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();

    // build your form group
    this.customerForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      age: [null, [this.minimumAgeValidator, this.numberValidator, Validators.max(50)]],
    });
  }


  getCustomerList(): void {
    this._customerService.list().subscribe(
      data => {
        this.customers = data;
        console.log("data: ", data);
      },
      error => console.log("error in fetching customer list: ", error),
    );
  }

  deleteThisCustomer(id: number): void {
    this._customerService.deleteById(id).subscribe(
      data => {
        console.log("Customer record deleted.");
        this.getCustomerList();
      },
      error => console.log("Error in deleting customer: ", error),
    );
  }

  openDeleteModal(template: TemplateRef<any>, id: number) {
    this.selectedCustomerID = id;
    this.modalRef = this._modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteThisCustomer(this.selectedCustomerID);
    this.selectedCustomerID = null;
    this.modalRef.hide();
  }

  decline(): void {
    this.selectedCustomerID = null;
    this.modalRef.hide();
  }

  minimumAgeValidator(control: AbstractControl): {[key: string]: boolean} | null {
    if (control.value < 18) {
      return {
        invalidAge: true,
      };
    } else {
      return null;
    }
  }

  numberValidator(control: AbstractControl): {[key: string]: boolean} | null {
    if (isNaN(control.value)) {
      return {
        isNotANumber: true,
      };
    } else {
      return null;
    }
  }

  onSubmit(): void {
    console.log("customer: ", this.customerForm.value);
    let newCustomerRecord = <ICustomer>{
      name: this.customerForm.get('name').value,
      age: this.customerForm.get('age').value,
      isActive: true,
    };
    if (!this.selectedCustomer) {
      this._customerService.create(newCustomerRecord).subscribe(
        data => {
          console.log("new data: ", data);
          this.getCustomerList();
          this.customerModalRef.hide();
        },
        error => {
          console.log("error in creating customer record: ", error);
        }
      );
    } else {
      this._customerService.save(this.selectedCustomer.id, newCustomerRecord).subscribe(
        data => {
          console.log("save changes: ", data);
          this.getCustomerList();
          this.customerModalRef.hide();
        },
        error => {
          console.log("error in saving changes to customer record: ", error);
        }
      );
    }
  }

  openCustomerModal(template: TemplateRef<any>, thisCustomer: ICustomer) {
    this.selectedCustomer = thisCustomer;
    if (!thisCustomer) {
      this.customerForm.get('name').setValue(null);
      this.customerForm.get('age').setValue(null);
    } else {
      this.customerForm.get('name').setValue(thisCustomer.name);
      this.customerForm.get('age').setValue(thisCustomer.age);
    }
    this.customerModalRef = this._modalService.show(template, {class: 'modal-sm'});
  }

  customerDetail(selectedCustomer) :void {
    console.log(selectedCustomer);
    this.selectedCustomer = selectedCustomer;
    this.showDetail = true;
  }

}