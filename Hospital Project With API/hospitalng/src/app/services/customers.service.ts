import { CustomerDto } from './../shared/models/customerDto';
import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllCustomers() {
    return this.http.get(this.appConstants.serverPath + 'Customers/GetAllCustomers');
  }
  public getCustomer(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Customers/GetCustomer/' + id);
  }
  public registerCustomer(customerDto: CustomerDto) {
    return this.http.post(this.appConstants.serverPath + 'Customers/AddCustomer', customerDto, this.appConstants.httpOptions);
  }
  public deleteCustomer(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Customers/DeleteCustomer/' + id);
  }
  public updateCustomer(id: number, customerDto: CustomerDto) {
    return this.http.put(this.appConstants.serverPath + 'Customers/UpdateCustomer/' + id, customerDto, this.appConstants.httpOptions);
  }
}
