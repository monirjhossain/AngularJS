import { HospitalsService } from './../../../../services/hospitals.service';
import { HttpClient } from '@angular/common/http';
import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { EmployeesService } from './../../../../services/employees.service';
import { EmployeeDto } from './../../../../shared/models/employeeDto';
import { DoctorsService } from './../../../../services/doctors.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {


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
    public dialogRef: MatDialogRef<EditEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: EmployeeDto) {
  }

  ngOnInit() {

    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });
    this.hospitalsService.getAllHospitals().subscribe(data=>{
      this.hospitals = data as HospitalDto[];
    });
    
    this.employeeUpdateForm = this.fb.group({
      employeeId: [this.data.employeeId],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName],
      email: [this.data.email, [Validators.required, Validators.pattern]],
      username: [this.data.username, Validators.required],
      phone: [this.data.phone, Validators.required],
      country: [this.data.country, Validators.required],
      address: [this.data.address, Validators.required],
      password: [this.data.address, [Validators.required, Validators.minLength(8), Validators.pattern]],
      hospital: [this.data.hospital, Validators.required],
    });
  }

  update() {
    this.employeeObj = this.employeeUpdateForm.value;
    this.employeeUpdateForm.setValue(this.employeeObj);

    this.employeesService.updateEmployee(this.employeeObj.employeeId, this.employeeObj).subscribe(response => {
      this.dialogRef.close();
      this.ngOnInit();
      this.toaster.success("New record updated sucessfully", "Doctor Changed");
    });
  }

}
