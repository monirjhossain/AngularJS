import { passwordDto } from './../shared/models/passwordDto';
import { HospitalDto } from './../shared/models/hospitalDto';
import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllHospitals() {
    return this.http.get(this.appConstants.serverPath + 'Hospitals/GetAllHospitals');
  }
  public getHospital(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Hospitals/GetHospital/' + id);
  }
  public registerHospital(hospitalDto: HospitalDto) {
    return this.http.post(this.appConstants.serverPath + 'Hospitals/AddHospital', hospitalDto, this.appConstants.httpOptions);
  }
  public deleteHospital(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Hospitals/DeleteHospital/' + id);
  }
  public updateHospital(id: number, hospitals: HospitalDto) {
    return this.http.put(this.appConstants.serverPath + 'Hospitals/UpdateHospital/' + id, hospitals, this.appConstants.httpOptions);
  }
  public updateHospitalPassword(id: number, passwordDto: passwordDto) {
    return this.http.put(this.appConstants.serverPath + 'Hospitals/UpdateHospitalPassword/' + id, passwordDto, this.appConstants.httpOptions);
  }
}
