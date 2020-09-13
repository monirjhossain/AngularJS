import { MatPaginator } from '@angular/material/paginator';
import { EditAppointmentComponent } from './../../apps/Edit/edit-appointment/edit-appointment.component';
import { AppointmentsService } from './../../../services/appointments.service';
import { ToastrService } from 'ngx-toastr';
import { AppointmentDto } from './../../../shared/models/appointmentDto';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'page-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class PageAppointmentsComponent extends BasePageComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointments: any[];

  appointmentsList: AppointmentDto[];
  pageId = 0;
  selectedAppointment: AppointmentDto;
  dateArr: any[];
  dialogRef: any;
  dataSourceAppointments: MatTableDataSource<AppointmentDto>;
  displayedColumns: string[] = ['Customer', 'Doctor', 'Department', 'Date', 'Slot Date', 'Slot Start Time',
    'Slot End Time', 'Employee', 'Payment', 'Action'];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private appointmentsService: AppointmentsService,
    public dialog: MatDialog,
    public toaster: ToastrService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Appointments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Appointments'
        }
      ]
    };
    this.appointments = [];
    this.selectedAppointment = { appointmentId: null, customer: '', doctor: '', department: '', date: null, slotDate: null, slotStartTime: null, slotEndTime: null, employeeId: null, payment: null };

  }

  ngOnInit() {
    super.ngOnInit();
    this.appointmentsService.getAllAppointments().subscribe(response => {
      this.appointmentsList = response as AppointmentDto[];
      this.dataSourceAppointments = new MatTableDataSource(this.appointmentsList);
      this.dataSourceAppointments.paginator = this.paginator;
      this.dataSourceAppointments.sort = this.sort;
    });

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  remove(id: number) {
    if (confirm('Are you sure want to delete') === true) {
      this.appointmentsService.deleteAppointment(id).subscribe(response => {
        this.ngOnInit();
      });
    }
  }
  update(id: number) {
    if (id != null) {
      this.appointmentsService.getAppointment(id).subscribe(response => {
        this.selectedAppointment = response as AppointmentDto;
        this.dialogRef = this.dialog.open(EditAppointmentComponent, {

          closeOnNavigation: false, minWidth: '50%', autoFocus: true,

          data: {
            appointmentId: this.selectedAppointment.appointmentId,
            customer: this.selectedAppointment.customer,
            department: this.selectedAppointment.department,
            doctor: this.selectedAppointment.doctor,
            payment: this.selectedAppointment.payment,
            date: this.selectedAppointment.date,
            slotDate: this.selectedAppointment.slotDate,
            slotStartTime: this.selectedAppointment.slotStartTime,
            slotEndTime: this.selectedAppointment.slotEndTime,
            employeeId: this.selectedAppointment.employeeId,
          }
        });
      });
    } else
      this.toaster.error('', 'Internal Server Error', { closeButton: true });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAppointments.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAppointments.paginator) {
      this.dataSourceAppointments.paginator.firstPage();
    }
  }
}
