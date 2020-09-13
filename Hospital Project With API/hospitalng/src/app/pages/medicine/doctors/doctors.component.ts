import { MatPaginator } from '@angular/material/paginator';
import { DoctorsService } from './../../../services/doctors.service';
import { EditDoctorComponent } from './../../apps/Edit/edit-doctor/edit-doctor.component';
import { ToastrService } from 'ngx-toastr';
import { DoctorDto } from './../../../shared/models/doctorDto';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IUser } from '../../../ui/interfaces/user';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { Content } from '../../../ui/interfaces/modal';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IOption } from '../../../ui/interfaces/option';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'page-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class PageDoctorsComponent extends BasePageComponent implements OnInit, OnDestroy {
  doctors: IUser[];
  doctorForm: FormGroup;
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  specialists: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  doctorsList: DoctorDto[];
  pageId = 0;
  selectedDoctor: DoctorDto;
  dateArr: any[];
  dialogRef: any;
  dataSourceDoctor: MatTableDataSource<DoctorDto>;
  displayedColumns: string[] = ['First Name', 'Last Name', 'User Name', 'Email', 'Country',
    'Phone', 'Address', 'Speciality', 'Availability', 'Hospital', 'Department', 'Action'];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private doctorsService: DoctorsService,
    public dialog: MatDialog,
    public toaster: ToastrService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Doctors',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Doctors'
        }
      ]
    };
    this.doctors = [];
    this.selectedDoctor = { doctorId: null, firstName: '', lastName: '', phone: null, email: '', password: '', username: '', address: '', country: '', speciality: '', availability: '', hospital: '',department:'' };
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData('assets/data/doctors.json', 'doctors', 'setLoaded');  

    this.doctorsService.getAllDoctors().subscribe(response => {
      this.doctorsList = response as DoctorDto[];
      this.dataSourceDoctor = new MatTableDataSource(this.doctorsList);
      this.dataSourceDoctor.paginator = this.paginator;
    });

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  remove(id: number) {
    if (confirm('Are you sure want to delete') === true) {
      this.doctorsService.deleteDoctor(id).subscribe(response => {
        this.ngOnInit();
      });
    }
  }
  update(id: number) {
    if (id != null) {
      this.doctorsService.getDoctor(id).subscribe(response => {
        this.selectedDoctor = response as DoctorDto;
        this.dialogRef = this.dialog.open(EditDoctorComponent, {

          closeOnNavigation: false, minWidth: '50%', autoFocus: true,

          data: {
            doctorId: this.selectedDoctor.doctorId,
            firstName: this.selectedDoctor.firstName,
            lastName: this.selectedDoctor.lastName,
            phone: this.selectedDoctor.phone,
            email: this.selectedDoctor.email,
            password: this.selectedDoctor.password,
            country: this.selectedDoctor.country,
            address: this.selectedDoctor.address,
            username: this.selectedDoctor.username,
            speciality: this.selectedDoctor.speciality,
            availability: this.selectedDoctor.availability,
            hospital: this.selectedDoctor.hospital,
            department: this.selectedDoctor.department,
          }
        });
      });
    } else
      this.toaster.error('', 'Internal Server Error', { closeButton: true });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDoctor.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDoctor.paginator) {
      this.dataSourceDoctor.paginator.firstPage();
    }
  }
}
