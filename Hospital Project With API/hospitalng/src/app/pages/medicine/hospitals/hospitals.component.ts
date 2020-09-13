import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { EditHospitalComponent } from './../../apps/Edit/edit-hospital/edit-hospital.component';
import { HospitalDto } from './../../../shared/models/hospitalDto';
import { DoctorDto } from './../../../shared/models/doctorDto';
import { HospitalsService } from './../../../services/hospitals.service';
import { TCModalService } from './../../../ui/services/modal/modal.service';
import { IAppState } from './../../../interfaces/app-state';
import { HttpService } from './../../../services/http/http.service';
import { Store } from '@ngrx/store';
import { IUser } from './../../../ui/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasePageComponent } from './../../base-page/base-page.component';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class PageHospitalsComponent extends BasePageComponent implements OnInit, OnDestroy{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  appointments: any[];

  hospitalsList: HospitalDto[];
  pageId = 0;
  selectedhospital: HospitalDto;
  dateArr: any[];
  dialogRef: any;
  dataSourceHospital: MatTableDataSource<HospitalDto>;
  displayedColumns: string[] = ['Name', 'User Name', 'Email', 'Country',
    'Phone', 'Address', 'Action'];


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private hospitalsService: HospitalsService,
    public dialog: MatDialog,
    public toaster: ToastrService,
  ) {
    
    super(store, httpSv);

    this.pageData = {
      title: 'Hospitals',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Hospitals'
        }
      ]
    };
    this.appointments = [];
    this.selectedhospital = { hospitalId: null, name: '', phone: null, email: '', password: '', username: '', address:'',country:'' };
  }

  ngOnInit() {
    super.ngOnInit();

    this.hospitalsService.getAllHospitals().subscribe(response => {
      this.hospitalsList = response as HospitalDto[];
      this.dataSourceHospital = new MatTableDataSource(this.hospitalsList);
      this.dataSourceHospital.paginator = this.paginator;
    });

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  remove(id: number) {
    if (confirm('Are you sure want to delete') === true) {
      this.hospitalsService.deleteHospital(id).subscribe(response => {
        this.ngOnInit();
      });
    }
  }
  update(id: number) {
    if (id != null) {
      this.hospitalsService.getHospital(id).subscribe(response => {
        this.selectedhospital = response as HospitalDto;
        this.dialogRef = this.dialog.open(EditHospitalComponent, {

          closeOnNavigation: false, minWidth: '50%' , autoFocus: true,

          data: {
            hospitalId: this.selectedhospital.hospitalId,
            name: this.selectedhospital.name,
            phone: this.selectedhospital.phone,
            email: this.selectedhospital.email,
            password: this.selectedhospital.password,
            country: this.selectedhospital.country,
            address: this.selectedhospital.address,
            username: this.selectedhospital.username,
          }
        });
      });
    } else
      this.toaster.error('', 'Internal Server Error', { closeButton: true });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHospital.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHospital.paginator) {
      this.dataSourceHospital.paginator.firstPage();
    }
  }
}
