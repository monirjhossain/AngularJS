import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { HospitalsService } from './../../../../services/hospitals.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../../../../services/employees.service';
import { EmployeeDto } from './../../../../shared/models/employeeDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {

  employeeUpdateForm: FormGroup;
  employeeObj: EmployeeDto;
  countries: any = [];
  hospitals: HospitalDto[];

  constructor(
    private httpClient: HttpClient,
    private employeesService: EmployeesService,
    private hospitalsService: HospitalsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterEmployeeComponent>) {
  }

  ngOnInit() {

    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });
    this.hospitalsService.getAllHospitals().subscribe(data=>{
      this.hospitals = data as HospitalDto[];
    });

    this.employeeUpdateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern]],
      hospital: ['', Validators.required],
    });
  }

  registerEmployee() {
    this.employeeObj = this.employeeUpdateForm.value;
    this.employeeUpdateForm.setValue(this.employeeObj);

    this.employeesService.registerEmployee(this.employeeObj).subscribe(response => {
      this.dialogRef.close();
      this.toaster.success("New Employee Added", "Successfully");

    });
  }

}
