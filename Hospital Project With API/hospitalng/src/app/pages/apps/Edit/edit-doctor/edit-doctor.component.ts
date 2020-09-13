import { DepartmentsService } from './../../../../services/departments.service';
import { HospitalsService } from './../../../../services/hospitals.service';
import { HttpClient } from '@angular/common/http';
import { DepartmentDto } from './../../../../shared/models/departmentDto';
import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { DoctorDto } from './../../../../shared/models/doctorDto';
import { DoctorsService } from './../../../../services/doctors.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditDoctorComponent>, @Inject(MAT_DIALOG_DATA) public data: DoctorDto) {
  }

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
      doctorId: [this.data.doctorId],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName],
      email: [this.data.email, [Validators.required, Validators.pattern]],
      username: [this.data.username, Validators.required],
      phone: [this.data.phone, Validators.required],
      country: [this.data.country, Validators.required],
      address: [this.data.address, Validators.required],
      password: [this.data.password, [Validators.required, Validators.minLength(8), Validators.pattern]],
      speciality: [this.data.speciality, Validators.required],
      availability: [this.data.availability, Validators.required],
      hospital: [this.data.hospital, Validators.required],
      department: [this.data.department, Validators.required],
    });
  }

  update() {
    this.doctorObj = this.doctorUpdateForm.value;
    this.doctorUpdateForm.setValue(this.doctorObj);
    
    this.doctorsService.updateDoctor(this.doctorObj.doctorId, this.doctorObj).subscribe(response => {
      this.dialogRef.close();
      this.toaster.success("New record updated sucessfully", "Doctor Changed");
    });
  }
}
