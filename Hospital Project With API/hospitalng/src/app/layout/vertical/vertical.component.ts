import { RegisterDepartmentComponent } from './../../pages/apps/register/register-department/register-department.component';
import { RegisterHospitalComponent } from './../../pages/apps/register/register-hospital/register-hospital.component';
import { RegisterEmployeeComponent } from './../../pages/apps/register/register-employee/register-employee.component';
import { RegisterDoctorComponent } from './../../pages/apps/register/register-doctor/register-doctor.component';
import { RegisterAppointmentComponent } from './../../pages/apps/register/register-appointment/register-appointment.component';
import { RegisterPatientComponent } from './../../pages/apps/register/register-patient/register-patient.component';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from "../../interfaces/app-state";
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { HttpService } from '../../services/http/http.service';
import { IOption } from '../../ui/interfaces/option';
import { Content } from '../../ui/interfaces/modal';
import { TCModalService } from '../../ui/services/modal/modal.service';
import { IPatient } from '../../interfaces/patient';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './vertical.component.scss'
  ]
})
export class VerticalLayoutComponent extends BaseLayoutComponent implements OnInit {
  patientForm: FormGroup;
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  role;
  dialogRef: any;

  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef,
    private modal: TCModalService,
    public dialog: MatDialog,
  ) {
    super(store, fb, httpSv, router, elRef);

    this.gender = [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();
    this.role = sessionStorage.getItem('Ruser');

    this.store.dispatch(new SettingsActions.Update({ layout: 'vertical' }));
  }

  registerPatient(){
        this.dialogRef = this.dialog.open(RegisterPatientComponent, {
          closeOnNavigation: false, minWidth: '50%', autoFocus: true
        });
  }
  registerDoctor(){
        this.dialogRef = this.dialog.open(RegisterDoctorComponent, {
          closeOnNavigation: false, minWidth: '50%', autoFocus: true
        });
  }
  registerHospital(){
        this.dialogRef = this.dialog.open(RegisterHospitalComponent, {
          closeOnNavigation: false, minWidth: '50%', autoFocus: true
        });
  }
  registerDepartment(){
    this.dialogRef = this.dialog.open(RegisterDepartmentComponent, {
      closeOnNavigation: false, minWidth: '50%', autoFocus: true
    });
  }
  registerEmployee(){
        this.dialogRef = this.dialog.open(RegisterEmployeeComponent, {
          closeOnNavigation: false, minWidth: '50%', autoFocus: true
        });
  }

  registerAppointment(){
        this.dialogRef = this.dialog.open(RegisterAppointmentComponent, {
          closeOnNavigation: false, minWidth: '50%', autoFocus: true
        });
  }
  
  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPatientForm();

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.patientForm.reset();
    this.currentAvatar = this.defaultAvatar;
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // init form
  initPatientForm() {
    this.patientForm = this.fb.group({
      img: [],
      name: ['', Validators.required],
      number: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // add new patient
  addPatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: IPatient = form.value;

      newPatient.img = this.currentAvatar;
      newPatient.id = '23';
      newPatient.status = 'Pending';
      newPatient.lastVisit = '';

      this.store.dispatch(new PatientsActions.Add(newPatient));
      this.closeModal();
      this.patientForm.reset();
    }
  }
}
