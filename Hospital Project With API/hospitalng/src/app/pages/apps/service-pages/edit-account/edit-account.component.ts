import { Router } from '@angular/router';
import { passwordDto } from './../../../../shared/models/passwordDto';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../../../../services/employees.service';
import { EmployeeDto } from './../../../../shared/models/employeeDto';
import { HospitalDto } from './../../../../shared/models/hospitalDto';
import { AdministratorDto } from './../../../../shared/models/administratorDto';
import { AdministratorsService } from './../../../../services/administrators.service';
import { HospitalsService } from './../../../../services/hospitals.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {

  role = null;
  userId: any;
  admin: AdministratorDto;
  hospital: HospitalDto;
  employee: EmployeeDto;
  adminUpdateForm: FormGroup;
  hospitalUpdateForm: FormGroup;
  employeeUpdateForm: FormGroup;
  passwordResetForm: FormGroup;
  adminObj: AdministratorDto;
  hospitalObj: HospitalDto;
  employeeObj: EmployeeDto;
  passwordObj: passwordDto;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private administratorsService: AdministratorsService,
    private hospitalsService: HospitalsService,
    private employeesService: EmployeesService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Edit account',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Apps',
          route: 'default-dashboard'
        },
        {
          title: 'Service pages',
          route: 'default-dashboard'
        },
        {
          title: 'Edit account'
        }
      ]
    };

    this.role = sessionStorage.getItem('Ruser');
    this.userId = sessionStorage.getItem('user');

  }

  ngOnInit() {
    super.ngOnInit();
    this.getData('assets/data/account-data.json', 'userInfo', 'loadedDetect');

    this.initializePasswordResetForm();
    this.initializeAdminForm();
    this.initializeHospitalForm();
    this.initializeEmployeeForm();

    if (this.role == 1) {
      this.administratorsService.getAdministrator(this.userId).subscribe(response => {
        this.admin = response as AdministratorDto;
        this.adminUpdateForm.setValue(this.admin);
      });

    } else if (this.role == 2) {
      this.hospitalsService.getHospital(this.userId).subscribe(response => {
        this.hospital = response as HospitalDto;
        this.hospitalUpdateForm.setValue(this.hospital);
      });
    } else if (this.role == 3) {
      this.employeesService.getEmployee(this.userId).subscribe(response => {
        this.employee = response as EmployeeDto;
        this.employeeUpdateForm.setValue(this.employee);
      });
    } else {
      this.toaster.warning("Not Logged In");
    }

  }

  updateAdminDetail() {
    this.adminObj = this.adminUpdateForm.value;
    this.adminUpdateForm.setValue(this.adminObj);
    this.administratorsService.updateAdministrator(this.userId, this.adminObj).subscribe((response: any) => {

      if (response == null) {
        this.toaster.success("User updated", 'Sucessfull');
      } else {
        this.toaster.warning('Server not responding1', 'Failed');
      }

    }, (error: HttpErrorResponse) => {
      if (error) {
        this.toaster.warning('Server not responding', 'Failed');
      }
    });
  }
  updateHospitalDetail() {
    this.hospitalObj = this.hospitalUpdateForm.value;
    this.hospitalUpdateForm.setValue(this.hospitalObj);
    this.hospitalsService.updateHospital(this.userId, this.hospitalObj).subscribe((response: any) => {

      if (response == null) {
        this.toaster.success("User updated", 'Sucessfull');
      } else {
        this.toaster.warning('Server not responding1', 'Failed');
      }

    }, (error: HttpErrorResponse) => {
        this.toaster.warning(error.message);
    });
  }
  updateEmployeeDetail() {
    this.employeeObj = this.employeeUpdateForm.value;
    this.employeeUpdateForm.setValue(this.employeeObj);
    this.employeesService.updateEmployee(this.userId, this.employeeObj).subscribe((response: any) => {

      if (response == null) {
        this.toaster.success("User updated", 'Sucessfull');
      } else {
        this.toaster.warning('Server not responding1', 'Failed');
      }

    }, (error: HttpErrorResponse) => {
      if (error) {
        this.toaster.warning('Server not responding', 'Failed');
      }
    });
  }

  updatePasswordAdmin() {
    this.passwordObj = this.passwordResetForm.value;
    this.passwordResetForm.setValue(this.passwordObj);
    this.administratorsService.updateAdministratorPassword(this.userId, this.passwordObj).subscribe((response: any) => {

      if (response) {
        if (response.statusCode == 200) {
          this.toaster.success("Password updated successfully", 'Registered');
        } else if (response.statusCode == 500) {
          this.toaster.error('Current password incorrect', 'Failed');
        } else if (response.statusCode == 409) {
          this.toaster.error('New password is same as previous', 'Conflict');
        } else if (response.statusCode == 404) {
          this.toaster.error('User not found', 'Failed');
        }
      } else {
        this.toaster.warning('Server not responding1', 'Failed');
      }

    }, (error: HttpErrorResponse) => {
      if (error) {
        this.toaster.warning('Server not responding', 'Failed');
      }
    });
  }
  updatePasswordHospital() {
    this.passwordObj = this.passwordResetForm.value;
    this.passwordResetForm.setValue(this.passwordObj);
    this.hospitalsService.updateHospitalPassword(this.userId, this.passwordObj).subscribe((response: any) => {

      if (response) {
        if (response.statusCode == 200) {
          this.toaster.success("Password updated successfully", 'Registered');
        } else if (response.statusCode == 500) {
          this.toaster.error('Current password incorrect', 'Failed');
        } else if (response.statusCode == 409) {
          this.toaster.error('New password is same as previous', 'Conflict');
        } else if (response.statusCode == 404) {
          this.toaster.error('User not found', 'Failed');
        }
      } else {
        this.toaster.warning('Server not responding1', 'Failed');
      }

    }, (error: HttpErrorResponse) => {
      if (error) {
        this.toaster.warning('Server not responding', 'Failed');
      }
    });
  }
  updatePasswordEmployee() {
    this.passwordObj = this.passwordResetForm.value;
    this.passwordResetForm.setValue(this.passwordObj);
    this.employeesService.updateEmployeePassword(this.userId, this.passwordObj).subscribe((response: any) => {

      if (response) {
        if (response.statusCode == 200) {
          this.toaster.success("Password updated successfully", 'Registered');
        } else if (response.statusCode == 500) {
          this.toaster.error('Current password incorrect', 'Failed');
        } else if (response.statusCode == 409) {
          this.toaster.error('New password is same as previous', 'Conflict');
        } else if (response.statusCode == 404) {
          this.toaster.error('User not found', 'Failed');
        }
      } else {
        this.toaster.warning('Server not responding1', 'Failed');
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        this.toaster.warning('Server not responding', 'Failed');
      }
    });
  }

  reset() {
    this.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();
  }

  initializeAdminForm() {
    this.adminUpdateForm = this.fb.group({
      administratorId: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern]],
      username: [null, Validators.required],
      phone: [null, Validators.required],
      country: [null, Validators.required],
      address: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  initializeHospitalForm() {
    this.hospitalUpdateForm = this.fb.group({
      hospitalId: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.pattern]],
      username: [null, Validators.required],
      phone: [null, Validators.required],
      country: [null, Validators.required],
      address: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  initializeEmployeeForm() {
    this.employeeUpdateForm = this.fb.group({
      employeeId: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern]],
      username: [null, Validators.required],
      phone: [null, Validators.required],
      country: [null, Validators.required],
      address: [null, Validators.required],
      password: [null, Validators.required],
      hospital: [null, Validators.required],
    });
  }
  initializePasswordResetForm() {
    this.passwordResetForm = this.fb.group({
      currentPassword: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern]],
      confirmPassword: [null, Validators.required]
    }, { validator: this.MustMatch('password', 'confirmPassword') });
  }

  // custom validator to check that two fields match
  public MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
