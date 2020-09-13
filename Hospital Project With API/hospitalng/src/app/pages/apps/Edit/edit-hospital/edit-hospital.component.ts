import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HospitalsService } from './../../../../services/hospitals.service';
import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent implements OnInit {

  hospitalUpdateForm: FormGroup;
  hospitalObj: HospitalDto;
  today = null;
  countries: any = [];

  constructor(
    private httpClient: HttpClient,
    private hospitalsService: HospitalsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditHospitalComponent>, @Inject(MAT_DIALOG_DATA) public data: HospitalDto) {
  }

  ngOnInit() {
    
    this.httpClient.get("assets/data/countries.json").subscribe(data =>{
      this.countries = data;
    });

    this.hospitalUpdateForm = this.fb.group({
      hospitalId: [this.data.hospitalId],
      name: [this.data.name, [Validators.required, Validators.minLength(3)]],
      email: [this.data.email, [Validators.required, Validators.pattern]],
      username: [this.data.username, Validators.required],
      phone: [this.data.phone, Validators.required],
      country: [this.data.country, Validators.required],
      address: [this.data.address, Validators.required],
      password: [this.data.address, [Validators.required, Validators.minLength(8), Validators.pattern]],
    });
  }

  update() {
    this.hospitalObj = this.hospitalUpdateForm.value;
    this.hospitalUpdateForm.setValue(this.hospitalObj);

    this.hospitalsService.updateHospital(this.hospitalObj.hospitalId, this.hospitalObj).subscribe(response => {
      this.dialogRef.close();
      this.ngOnInit();
      this.toaster.success("New record updated sucessfully", "Hospital Changed");
    });
  }

}
