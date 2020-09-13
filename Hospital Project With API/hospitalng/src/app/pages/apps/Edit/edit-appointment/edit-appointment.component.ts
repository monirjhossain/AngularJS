import { DoctorDto } from './../../../../shared/models/doctorDto';
import { DepartmentDto } from './../../../../shared/models/departmentDto';
import { DepartmentsService } from './../../../../services/departments.service';
import { DoctorsService } from './../../../../services/doctors.service';
import { AppointmentsService } from './../../../../services/appointments.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentDto } from './../../../../shared/models/appointmentDto';
import { EditAdministratorComponent } from './../edit-administrator/edit-administrator.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {

  disabledEmployeeAddedData = true;
  departmentList: DepartmentDto[];
  doctorsList: DoctorDto[];
  selectedDoctorsList: any[];
  appointmentUpdateForm: FormGroup;
  appointmentObj: AppointmentDto;
  today = null;

  constructor(
    private appointmentsService: AppointmentsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private departmentService: DepartmentsService,
    private doctorsService: DoctorsService,
    public dialogRef: MatDialogRef<EditAdministratorComponent>, @Inject(MAT_DIALOG_DATA) public data: AppointmentDto) {
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(response => {
      this.departmentList = response as DepartmentDto[];
    });
    this.doctorsService.getAllDoctors().subscribe(response => {
      this.doctorsList = response as DoctorDto[];
    });
    this.appointmentUpdateForm = this.fb.group({
      appointmentId: [this.data.appointmentId],
      customer: [this.data.customer, Validators.required],
      doctor: [this.data.doctor, Validators.required],
      department: [this.data.department, Validators.required],
      payment: [this.data.payment, Validators.required],
      date: [this.data.date, [Validators.required, Validators.pattern]],
      slotDate: [this.data.slotDate, Validators.required],
      slotStartTime: [this.data.slotStartTime, Validators.required],
      slotEndTime: [this.data.slotEndTime, Validators.required],
      employeeId: [{value:'this.data.employeeId',disabled: true}],
    });
  }

  update() {
    this.appointmentObj = this.appointmentUpdateForm.value;
    this.appointmentObj.slotDate = Date.parse(this.appointmentObj.slotDate.toString()).toString();
    this.appointmentUpdateForm.setValue(this.appointmentObj);
    
    this.appointmentsService.updateAppointment(this.appointmentObj.appointmentId, this.appointmentObj).subscribe(response => {
      this.dialogRef.close();
      this.toaster.success("New record updated sucessfully", "Appointment Changed");
    });
  }
  searchDoctor(dept){
    this.selectedDoctorsList = this.doctorsList.filter(x=>x.department == dept);
  }

}
