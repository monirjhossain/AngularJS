import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentDto } from '../shared/models/departmentDto';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllDepartments() {
    return this.http.get(this.appConstants.serverPath + 'Departments/GetAllDepartments');
  }
  public getDepartment(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Departments/GetDepartment/' + id);
  }
  public registerDepartment(departmentDto: DepartmentDto) {
    return this.http.post(this.appConstants.serverPath + 'Departments/AddDepartment', departmentDto, this.appConstants.httpOptions);
  }
  public deleteDepartment(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Departments/DeleteDepartment/' + id);
  }
  public updateDepartment(id: number, departmentDto: DepartmentDto) {
    return this.http.put(this.appConstants.serverPath + 'Departments/UpdateDepartment/' + id, departmentDto, this.appConstants.httpOptions);
  }
}
