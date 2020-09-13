import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from './../../../../services/departments.service';
import { DepartmentDto } from './../../../../shared/models/departmentDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-department',
  templateUrl: './register-department.component.html',
  styleUrls: ['./register-department.component.scss']
})
export class RegisterDepartmentComponent implements OnInit {


  departmentRegisterForm: FormGroup;
  departmentObj: DepartmentDto;

  constructor(
    private departmentsService: DepartmentsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterDepartmentComponent>) {
  }

  ngOnInit() {

    this.departmentRegisterForm = this.fb.group({
      name: [null, Validators.required]
    });
  }

  registerDepartment() {
    this.departmentObj = this.departmentRegisterForm.value;
    this.departmentRegisterForm.setValue(this.departmentObj);

    this.departmentsService.registerDepartment(this.departmentObj).subscribe(response => {
      this.ngOnInit();
      this.dialogRef.close();
      this.toaster.success("New Department Added", "Successfully");
    });
  }

}
