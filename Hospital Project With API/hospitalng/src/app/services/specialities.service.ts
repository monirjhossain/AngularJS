import { SpecialityDto } from './../shared/models/specialityDto';
import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllSpecialities(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Specialities/GetAllSpecialities/' + id);
  }
  public getSpeciality(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Specialities/GetSpeciality/' + id);
  }
  public registerSpeciality(specialityDto: SpecialityDto) {
    return this.http.post(this.appConstants.serverPath + 'Specialities/AddSpeciality', specialityDto, this.appConstants.httpOptions);
  }
  public deleteSpeciality(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Specialities/DeleteSpeciality/' + id);
  }
  public updateSpeciality(id: number, specialityDto: SpecialityDto) {
    return this.http.put(this.appConstants.serverPath + 'Specialities/UpdateSpeciality/' + id, specialityDto, this.appConstants.httpOptions);
  }
}
