import { DepartmentDto } from './../../../../shared/models/departmentDto';
import { DepartmentsService } from './../../../../services/departments.service';
import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { HospitalsService } from './../../../../services/hospitals.service';
import { HttpClient } from '@angular/common/http';
import { CountryDto } from './../../../../shared/models/countryDto';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DoctorsService } from './../../../../services/doctors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorDto } from './../../../../shared/models/doctorDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {

  doctorUpdateForm: FormGroup;
  doctorObj: DoctorDto;
  today = null;
  countries: any = [];
  specialities: any = [];
  hospitals: HospitalDto[];
  departments: DepartmentDto[];

  constructor(
    private httpClient: HttpClient,
    private doctorsService: DoctorsService,
    private hospitalsService: HospitalsService,
    private departmentsService: DepartmentsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterDoctorComponent>) { }

  ngOnInit() {

    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });
    this.httpClient.get("assets/data/specialities.json").subscribe(data =>{
      this.specialities = data;
    });
    this.hospitalsService.getAllHospitals().subscribe(data=>{
      this.hospitals = data as HospitalDto[];
    });
    this.departmentsService.getAllDepartments().subscribe(data=>{
      this.departments = data as DepartmentDto[];
    });

    this.doctorUpdateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern]],
      speciality: ['', Validators.required],
      availability: ['', Validators.required],
      hospital: ['', Validators.required],
      department: ['', Validators.required],
    });
  }
  registerDoctor() {
    this.doctorObj = this.doctorUpdateForm.value;
    this.doctorUpdateForm.setValue(this.doctorObj);
    console.log(this.doctorObj);

    this.doctorsService.registerDoctor(this.doctorObj).subscribe(response => {
      this.ngOnInit();
      this.dialogRef.close();
      this.toaster.success("New Doctor Added", "Successfully");
    });
  }

}
