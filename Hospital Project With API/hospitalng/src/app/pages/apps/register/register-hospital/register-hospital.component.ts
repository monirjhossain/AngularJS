import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HospitalsService } from './../../../../services/hospitals.service';
import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-hospital',
  templateUrl: './register-hospital.component.html',
  styleUrls: ['./register-hospital.component.scss']
})
export class RegisterHospitalComponent implements OnInit {
  
  hospitalUpdateForm: FormGroup;
  hospitalObj: HospitalDto;
  countries: any = [];
  
  constructor(    
    private httpClient: HttpClient,
    private hospitalsService: HospitalsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterHospitalComponent>) { }

  ngOnInit() {
    
    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });

    this.hospitalUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern]],
    });
  }

  registerHospital() {
    this.hospitalObj = this.hospitalUpdateForm.value;
    this.hospitalUpdateForm.setValue(this.hospitalObj);

    this.hospitalsService.registerHospital(this.hospitalObj).subscribe(response => {
      this.dialogRef.close();
      this.toaster.success("New Hospital Added", "Successfully");
    });
  }

}
