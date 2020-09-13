import { HttpClient } from '@angular/common/http';
import { CustomerDto } from './../../../../shared/models/customerDto';
import { CustomersService } from './../../../../services/customers.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {

  customerUpdateForm: FormGroup;
  customerObj: CustomerDto;
  countries: any = [];

  constructor(    
    private httpClient: HttpClient,
    private customersService: CustomersService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterPatientComponent>) {
  }

  ngOnInit() {
    
    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });

    this.customerUpdateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern]],
    });
  }

  registerPatient() {
    this.customerObj = this.customerUpdateForm.value;
    this.customerUpdateForm.setValue(this.customerObj);

    this.customersService.registerCustomer(this.customerObj).subscribe(response => {
      this.dialogRef.close();
      this.toaster.success("Patient Added Successfully", "Successful");
    });
  }

}
