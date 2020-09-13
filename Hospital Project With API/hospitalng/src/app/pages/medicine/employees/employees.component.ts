import { MatPaginator } from '@angular/material/paginator';
import { IUser } from './../../../ui/interfaces/user';
import { BasePageComponent } from './../../base-page/base-page.component';
import { IAppState } from './../../../interfaces/app-state';
import { HttpService } from './../../../services/http/http.service';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../../../services/employees.service';
import { EditEmployeeComponent } from './../../apps/Edit/edit-employee/edit-employee.component';
import { EmployeeDto } from './../../../shared/models/employeeDto';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends BasePageComponent implements OnInit, OnDestroy{
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  doctors: IUser[];
  doctorForm: FormGroup;
  employeeList: EmployeeDto[];
  pageId = 0;
  selectedEmployee: EmployeeDto;
  dialogRef: any;
  dataSourceEmployee: MatTableDataSource<EmployeeDto>;
  displayedColumns: string[] = ['First Name', 'Last Name', 'User Name', 'Email', 'Country',
    'Phone', 'Address', 'Hospital', 'Action'];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private employeesService: EmployeesService,
    public dialog: MatDialog,
    public toaster: ToastrService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Employees',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Employees'
        }
      ]
    };
    this.doctors = [];
    this.selectedEmployee = { employeeId: null, firstName: '', lastName: '', phone: null, email: '', password: '', username: '', address: '', country: '', hospital: '' };
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData('assets/data/doctors.json', 'doctors', 'setLoaded');

    this.employeesService.getAllEmployees().subscribe(response => {
      this.employeeList = response as EmployeeDto[];
      this.dataSourceEmployee = new MatTableDataSource(this.employeeList);
      this.dataSourceEmployee.paginator = this.paginator;
      this.dataSourceEmployee.sort = this.sort;
    });

  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  remove(id: number) {
    if (confirm('Are you sure want to delete') === true) {
      this.employeesService.deleteEmployee(id).subscribe(response => {
        this.ngOnInit();
      });
    }
  }
  update(id: number) {
    if (id != null) {
      this.employeesService.getEmployee(id).subscribe(response => {
        this.selectedEmployee = response as EmployeeDto;
        this.dialogRef = this.dialog.open(EditEmployeeComponent, {

          closeOnNavigation: false, minWidth: '50%', autoFocus: true,

          data: {
            employeeId: this.selectedEmployee.employeeId,
            firstName: this.selectedEmployee.firstName,
            lastName: this.selectedEmployee.lastName,
            username: this.selectedEmployee.username,
            password: this.selectedEmployee.password,
            country: this.selectedEmployee.country,
            email: this.selectedEmployee.email,
            address: this.selectedEmployee.address,
            phone: this.selectedEmployee.phone,
            hospital: this.selectedEmployee.hospital,
          }
        });
      });
    } else
      this.toaster.error('', 'Internal Server Error', { closeButton: true });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEmployee.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEmployee.paginator) {
      this.dataSourceEmployee.paginator.firstPage();
    }
  }
}
