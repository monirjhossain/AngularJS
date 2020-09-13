import { DoctorDto } from './../shared/models/doctorDto';
import { loginDto } from './../shared/models/loginDto';
import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllDoctors() {
    return this.http.get(this.appConstants.serverPath + 'Doctors/GetAllDoctors');
  }
  public getDoctor(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Doctors/GetDoctor/' + id);
  }
  public registerDoctor(doctorDto: DoctorDto) {
    return this.http.post(this.appConstants.serverPath + 'Doctors/AddDoctor', doctorDto, this.appConstants.httpOptions);
  }
  public deleteDoctor(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Doctors/DeleteDoctor/' + id);
  }
  public updateDoctor(id: number, doctorDto: DoctorDto) {
    return this.http.put(this.appConstants.serverPath + 'Doctors/UpdateDoctor/' + id, doctorDto, this.appConstants.httpOptions);
  }
}
