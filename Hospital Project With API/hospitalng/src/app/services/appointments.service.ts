import { AppointmentDto } from './../shared/models/appointmentDto';
import { appConstants } from './../shared/core/appConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private http: HttpClient,
    private appConstants: appConstants,
  ) { }

  public getAllAppointments() {
    return this.http.get(this.appConstants.serverPath + 'Appointments/GetAllAppointments');
  }
  public getAppointment(id: number) {
    return this.http.get(this.appConstants.serverPath + 'Appointments/GetAppointment/' + id);
  }
  public registerAppointment(appointmentDto: AppointmentDto) {
    return this.http.post(this.appConstants.serverPath + 'Appointments/AddAppointment', appointmentDto, this.appConstants.httpOptions);
  }
  public deleteAppointment(id: number) {
    return this.http.delete(this.appConstants.serverPath + 'Appointments/DeleteAppointment/' + id);
  }
  public updateAppointment(id: number, appointmentDto: AppointmentDto) {
    return this.http.put(this.appConstants.serverPath + 'Appointments/UpdateAppointment/' + id, appointmentDto, this.appConstants.httpOptions);
  }
}
