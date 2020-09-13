import { EditDepartmentComponent } from './pages/apps/Edit/edit-department/edit-department.component';
import { RegisterDepartmentComponent } from './pages/apps/register/register-department/register-department.component';
import { RegisterHospitalComponent } from './pages/apps/register/register-hospital/register-hospital.component';
import { RegisterEmployeeComponent } from './pages/apps/register/register-employee/register-employee.component';
import { RegisterDoctorComponent } from './pages/apps/register/register-doctor/register-doctor.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { RegisterAppointmentComponent } from './pages/apps/register/register-appointment/register-appointment.component';
import { RegisterPatientComponent } from './pages/apps/register/register-patient/register-patient.component';
import { RoleGuard } from './shared/guards/role.guard';
import { EditHospitalComponent } from './pages/apps/Edit/edit-hospital/edit-hospital.component';
import { EditEmployeeComponent } from './pages/apps/Edit/edit-employee/edit-employee.component';
import { EditDoctorComponent } from './pages/apps/Edit/edit-doctor/edit-doctor.component';
import { EditCustomerComponent } from './pages/apps/Edit/edit-customer/edit-customer.component';
import { EditAppointmentComponent } from './pages/apps/Edit/edit-appointment/edit-appointment.component';
import { EditAdministratorComponent } from './pages/apps/Edit/edit-administrator/edit-administrator.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { appConstants } from './shared/core/appConstants';
import { loginAppConstants } from './shared/core/loginConstants';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ROUTES, RoutingModule } from './routing/routing.module';
import { LayoutModule } from './layout/layout.module';
import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { pageDataReducer } from './store/reducers/page-data.reducer';
import { appSettingsReducer } from './store/reducers/app-settings.reducer';
import { patientsReducer } from './store/reducers/patients.reducer';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot(ROUTES),
    RoutingModule,
    LayoutModule,
    UIModule,
    PagesModule,
    MaterialModule,
    NgbModule,
    StoreModule.forRoot({
      pageData: pageDataReducer,
      appSettings: appSettingsReducer,
      patients: patientsReducer
    }),
    ToastrModule.forRoot({
      timeOut: 4000, preventDuplicates: true, progressBar: true,
      closeButton: true
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: appConstants,
      multi: true,
    },
    appConstants,
    loginAppConstants,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditAdministratorComponent, EditAppointmentComponent, EditCustomerComponent, EditDoctorComponent, EditEmployeeComponent, EditHospitalComponent, EditDepartmentComponent, RegisterPatientComponent, RegisterAppointmentComponent, RegisterDoctorComponent, RegisterEmployeeComponent,RegisterHospitalComponent,RegisterDepartmentComponent]
})
export class AppModule { }
