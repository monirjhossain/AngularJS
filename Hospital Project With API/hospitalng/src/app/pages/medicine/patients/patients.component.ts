import { MatPaginator } from '@angular/material/paginator';
import { CustomersService } from './../../../services/customers.service';
import { DoctorDto } from './../../../shared/models/doctorDto';
import { EditCustomerComponent } from './../../apps/Edit/edit-customer/edit-customer.component';
import { CustomerDto } from './../../../shared/models/customerDto';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IPatient } from '../../../interfaces/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'page-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PagePatientsComponent extends BasePageComponent implements OnInit, OnDestroy {
  patients: IPatient[];
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  test: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  customersList: CustomerDto[];
  pageId = 0;
  selectedCustomer: CustomerDto;
  dateArr: any[];
  dialogRef: any;
  dataSourceCustomer: MatTableDataSource<CustomerDto>;
  displayedColumns: string[] = ['First Name', 'Last Name', 'User Name', 'Email', 'Country',
    'Phone', 'Address', 'Action'];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder,
    private customersService: CustomersService,
    public dialog: MatDialog,
    public toaster: ToastrService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patients',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients'
        }
      ]
    };
    this.patients = [];
    this.selectedCustomer = { customerId: null, firstName: '', lastName: '', phone: null, email: '', password: '', username: '', address: '', country: '' };
  }

  ngOnInit() {
    super.ngOnInit();

    this.customersService.getAllCustomers().subscribe(response => {
      this.customersList = response as CustomerDto[];
      this.dataSourceCustomer = new MatTableDataSource(this.customersList);
      this.dataSourceCustomer.paginator = this.paginator;

    });

    this.store.select('patients').subscribe(patients => {
      if (patients && patients.length) {
        this.patients = patients;

        !this.pageData.loaded ? this.setLoaded() : null;
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  remove(id: number) {
    if (confirm('Are you sure want to delete') === true) {
      this.customersService.deleteCustomer(id).subscribe(response => {
        this.ngOnInit();
      });
    }
  }
  update(id: number) {
    if (id != null) {
      this.customersService.getCustomer(id).subscribe(response => {
        this.selectedCustomer = response as CustomerDto;
        this.dialogRef = this.dialog.open(EditCustomerComponent, {

          closeOnNavigation: false, minWidth: '50%', autoFocus: true,

          data: {
            customerId: this.selectedCustomer.customerId,
            firstName: this.selectedCustomer.firstName,
            lastName: this.selectedCustomer.lastName,
            phone: this.selectedCustomer.phone,
            email: this.selectedCustomer.email,
            password: this.selectedCustomer.password,
            country: this.selectedCustomer.country,
            address: this.selectedCustomer.address,
            username: this.selectedCustomer.username,
          }
        });
      });
    } else
      this.toaster.error('', 'Internal Server Error', { closeButton: true });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCustomer.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCustomer.paginator) {
      this.dataSourceCustomer.paginator.firstPage();
    }
  }
}
