import { LoginService } from './../../../../services/login.service';
import { Router } from '@angular/router';
import { loginDto } from '../../../../shared/models/loginDto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class PageSignInComponent implements OnInit {

  signinObj: loginDto;
  signinForm: FormGroup;
  hide = true;

  constructor(
    private loginService: LoginService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { };

  ngOnInit() {
    sessionStorage.clear();
    this.signinForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  authenticateUser() {

    if (!this.signinForm.invalid) {
      this.signinObj = this.signinForm.value;
      this.loginService.signin(this.signinObj).subscribe(response => {

        if (response) {
          if (response.statusCode == 200) {
            sessionStorage.setItem('token', JSON.stringify(response.token));
            sessionStorage.setItem('Ruser', JSON.stringify(response.r));
            if (response.data.administratorId != null) {
              sessionStorage.setItem('user', JSON.stringify(response.data.administratorId));
            } else if (response.data.hospitalId != null) {
              sessionStorage.setItem('user', JSON.stringify(response.data.hospitalId));
            } else if (response.data.employeeId != null) {
              sessionStorage.setItem('user', JSON.stringify(response.data.employeeId));
            }
            this.router.navigateByUrl('/vertical/default-dashboard');
          } else {
            this.toaster.error('Server Not Responding');
          }
        } else {
          this.toaster.error('Server not responding', 'Failed');
        }

      }, (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.toaster.warning('Warning', 'Username or password incorrect');
        } else {
          this.toaster.warning('Server Not Responding');
        }
      });
    } else {
      this.toaster.warning('Form not valid');
    }
  }

  rememberMeCheckBox() {
    sessionStorage.setItem('rememberMe', '1');
  }
}
