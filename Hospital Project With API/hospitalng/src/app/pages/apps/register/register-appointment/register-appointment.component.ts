import { DoctorDto } from './../../../../shared/models/doctorDto';
import { DoctorsService } from './../../../../services/doctors.service';
import { DepartmentDto } from './../../../../shared/models/departmentDto';
import { DepartmentsService } from './../../../../services/departments.service';
import { AppointmentDto } from './../../../../shared/models/appointmentDto';
import { AppointmentsService } from './../../../../services/appointments.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-appointment',
  templateUrl: './register-appointment.component.html',
  styleUrls: ['./register-appointment.component.scss']
})
export class RegisterAppointmentComponent implements OnInit {

  departmentList: DepartmentDto[];
  doctorsList: DoctorDto[];
  selectedDoctorsList: any[];
  appointmentRegisterForm: FormGroup;
  appointmentObj: AppointmentDto;
  user: number;
  today = null;

  constructor(
    private appointmentsService: AppointmentsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private departmentService: DepartmentsService,
    private doctorsService: DoctorsService,
    public dialogRef: MatDialogRef<RegisterAppointmentComponent>) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.today = new Date();
    this.today = Date.parse(this.today).toString();
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(response => {
      this.departmentList = response as DepartmentDto[];
    });
    this.doctorsService.getAllDoctors().subscribe(response => {
      this.doctorsList = response as DoctorDto[];
    });

    this.appointmentRegisterForm = this.fb.group({
      customer: [null, Validators.required],
      doctor: ['', Validators.required],
      department: ['', Validators.required],
      date: [''],
      slotDate: ['', Validators.required],
      slotStartTime: ['', Validators.required],
      slotEndTime: ['', Validators.required],
      payment: [null, Validators.required],
      employeeId: [null],
    });
  }

  searchDoctor(dept) {
    this.selectedDoctorsList = this.doctorsList.filter(x => x.department == dept);
    this.selectedDoctorsList = this.selectedDoctorsList.filter(x=>x.availability == 'YES');
  }

  registerAppointment() {
    this.appointmentObj = this.appointmentRegisterForm.value;
    this.appointmentObj.employeeId = this.user;
    this.appointmentObj.date = this.today;
    this.appointmentObj.slotDate = Date.parse(this.appointmentObj.slotDate.toString()).toString();
    this.appointmentRegisterForm.setValue(this.appointmentObj);

    this.appointmentsService.registerAppointment(this.appointmentObj).subscribe(response => {
      this.ngOnInit();
      this.dialogRef.close();
      this.toaster.success("New Appointment Added", "Successfully");
    });
  }

}
