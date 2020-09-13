import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from './../../../../services/departments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentDto } from './../../../../shared/models/departmentDto';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  departmentRegisterForm: FormGroup;
  departmentObj: DepartmentDto;

  constructor(
    private departmentsService: DepartmentsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDepartmentComponent>, @Inject(MAT_DIALOG_DATA) public data: DepartmentDto) {
  }

  ngOnInit() {

    this.departmentRegisterForm = this.fb.group({
      departmentId: [this.data.departmentId],
      name: [this.data.name, Validators.required]
    });
  }

  update() {
    this.departmentObj = this.departmentRegisterForm.value;
    this.departmentRegisterForm.setValue(this.departmentObj);

    this.departmentsService.updateDepartment(this.departmentObj.departmentId, this.departmentObj).subscribe(response => {
      this.ngOnInit();
      this.dialogRef.close();
      this.toaster.success("New record updated sucessfully", "Department Changed");
    });
  }

}
