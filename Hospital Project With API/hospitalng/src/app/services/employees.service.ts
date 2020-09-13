import { passwordDto } from './../shared/models/passwordDto';
import { EmployeeDto } from './../shared/models/employeeDto';
import { HttpClient } from '@angular/common/http';
import { appConstants } from './../shared/core/appConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllEmployees() {
    return this.http.get(this.appConstants.serverPath + 'Employees/GetAllEmployees');
  }
  public getEmployee(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Employees/GetEmployee/' + id);
  }
  public registerEmployee(employeeDto: EmployeeDto) {
    return this.http.post(this.appConstants.serverPath + 'Employees/AddEmployee', employeeDto, this.appConstants.httpOptions);
  }
  public deleteEmployee(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Employees/DeleteEmployee/' + id);
  }
  public updateEmployee(id: number, employeeDto: EmployeeDto) {
    return this.http.put(this.appConstants.serverPath + 'Employees/UpdateEmployee/' + id, employeeDto, this.appConstants.httpOptions);
  }
  public updateEmployeePassword(id: number, passwordDto: passwordDto) {
    return this.http.put(this.appConstants.serverPath + 'Employees/UpdateEmployeePassword/' + id, passwordDto, this.appConstants.httpOptions);
  }
}
