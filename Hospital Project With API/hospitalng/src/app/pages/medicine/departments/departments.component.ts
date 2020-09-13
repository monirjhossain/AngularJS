import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from './../../../services/departments.service';
import { EditDepartmentComponent } from './../../apps/Edit/edit-department/edit-department.component';
import { DepartmentDto } from './../../../shared/models/departmentDto';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'page-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class PageDepartmentsComponent extends BasePageComponent implements OnInit, OnDestroy {

  departments: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  departmentsList: DepartmentDto[];
  selectedDepartment: DepartmentDto;
  dateArr: any[];
  dialogRef: any;
  dataSourceDepartment: MatTableDataSource<DepartmentDto>;
  displayedColumns: string[] = ['Name', 'Action'];
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private departmentsService: DepartmentsService,
    public dialog: MatDialog,
    public toaster: ToastrService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Departments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Departments'
        }
      ]
    };
    this.departments = [];
    this.selectedDepartment = { departmentId: null, name: '' };
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData('assets/data/departments.json', 'departments', 'setLoaded');

    this.departmentsService.getAllDepartments().subscribe(response => {
      this.departmentsList = response as DepartmentDto[];
      this.dataSourceDepartment = new MatTableDataSource(this.departmentsList);
      this.dataSourceDepartment.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  remove(id: number) {
    if (confirm('Are you sure want to delete') === true) {
      this.departmentsService.deleteDepartment(id).subscribe(response => {
        this.ngOnInit();
      });
    }
  }

  update(id: number) {
    if (id != null) {
      this.departmentsService.getDepartment(id).subscribe(response => {
        this.selectedDepartment = response as DepartmentDto;
        this.dialogRef = this.dialog.open(EditDepartmentComponent, {

          closeOnNavigation: false, minWidth: '50%', autoFocus: true,

          data: {
            departmentId: this.selectedDepartment.departmentId,
            name: this.selectedDepartment.name,
          }
        });
      });
    } else
      this.toaster.error('', 'Internal Server Error', { closeButton: true });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDepartment.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDepartment.paginator) {
      this.dataSourceDepartment.paginator.firstPage();
    }
  }
}
