import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomerDto } from './../../../../shared/models/customerDto';
import { CustomersService } from './../../../../services/customers.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customerUpdateForm: FormGroup;
  customerObj: CustomerDto;
  today = null;
  countries: any = [];

  constructor(
    private httpClient: HttpClient,
    private customersService: CustomersService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomerDto) {
  }

  ngOnInit() {

    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });
    
    this.customerUpdateForm = this.fb.group({
      customerId: [this.data.customerId],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName],
      email: [this.data.email, [Validators.required, Validators.pattern]],
      username: [this.data.username, Validators.required],
      phone: [this.data.phone, Validators.required],
      country: [this.data.country, Validators.required],
      address: [this.data.address, Validators.required],
      password: [this.data.password, [Validators.required, Validators.minLength(8), Validators.pattern]],
    });
  }

  update() {
    this.customerObj = this.customerUpdateForm.value;
    this.customerUpdateForm.setValue(this.customerObj);
    
    this.customersService.updateCustomer(this.customerObj.customerId, this.customerObj).subscribe(response => {
      this.dialogRef.close();
      this.toaster.success("New record updated sucessfully", "Customer Changed");
    });
  }

}
