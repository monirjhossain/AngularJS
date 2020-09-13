import { passwordDto } from './../shared/models/passwordDto';
import { AdministratorDto } from './../shared/models/administratorDto';
import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllAdministrators(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Administrators/GetAllAdministrators/' + id);
  }
  public getAdministrator(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Administrators/GetAdministrator/' + id);
  }
  public registerAdministrator(administratorDto: AdministratorDto) {
    return this.http.post(this.appConstants.serverPath + 'Administrators/AddAdministrator', administratorDto, this.appConstants.httpOptions);
  }
  public deleteAdministrator(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Administrators/DeleteAdministrator/' + id);
  }
  public updateAdministrator(id: number, administratorDto: AdministratorDto) {
    return this.http.put(this.appConstants.serverPath + 'Administrators/UpdateAdministrator/' + id, administratorDto, this.appConstants.httpOptions);
  }
  public updateAdministratorPassword(id: number, passwordDto: passwordDto) {
    return this.http.put(this.appConstants.serverPath + 'Administrators/UpdateAdministratorPassword/' + id, passwordDto, this.appConstants.httpOptions);
  }

}
