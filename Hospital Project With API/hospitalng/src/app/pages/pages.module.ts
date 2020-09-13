import { MaterialModule } from './../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FullCalendarModule } from 'ng-fullcalendar';
import { environment } from '../../environments/environment';
import { UIModule } from '../ui/ui.module';
import { LayoutModule } from '../layout/layout.module';
import { BasePageComponent } from './base-page';
import { PageDashboardComponent } from './dashboards/dashboard-1';
import { PageButtonsComponent } from './ui/components/buttons';
import { PageCardsComponent } from './ui/components/cards';
import { PageInputsComponent } from './ui/components/inputs';
import { PageSelectsComponent } from './ui/components/selects';
import { PageTextareasComponent } from './ui/components/textareas';
import { PageAutocompletesComponent } from './ui/components/autocompletes';
import { PageBadgesComponent } from './ui/components/badges';
import { PageRatingsComponent } from './ui/components/ratings';
import { PageSimpleTablesComponent } from './ui/tables/simple-tables';
import { PageSortingTableComponent } from './ui/tables/sorting-table';
import { PageSearchTableComponent } from './ui/tables/search-table';
import { PageFilterTableComponent } from './ui/tables/filter-table';
import { PagePaginationTableComponent } from './ui/tables/pagination-table';
import { PageAlertsComponent } from './ui/components/alerts';
import { PageCheckboxesComponent } from './ui/components/checkboxes';
import { PageRadioButtonsComponent } from './ui/components/radio-buttons';
import { PageSwitchersComponent } from './ui/components/switchers';
import { PageFormElementsComponent } from './ui/forms/form-elements';
import { PageFormLayoutsComponent } from './ui/forms/form-layouts';
import { PageFormValidationComponent } from './ui/forms/form-validation';
import { PageNg2ChartsComponent } from './ui/charts/ng2-charts';
import { PageNgxChartsComponent } from './ui/charts/ngx-charts';
import { PageNgxEchartsComponent } from './ui/charts/ngx-echarts';
import { PageGoogleMapsComponent } from './ui/maps/google-maps';
import { PageWorldMapComponent } from './ui/maps/world-map';
import { PageTypographyComponent } from './ui/typography';
import { PageIconsOptionsComponent } from './ui/icons/icons-options';
import { PageIconsIfComponent } from './ui/icons/icons-if';
import { PageIconsSliComponent } from './ui/icons/icons-sli';
import { PageContactsComponent } from './ui/components/contacts';
import { PageModalWindowsComponent } from './ui/components/modal-windows';
import { PageDoctorsComponent } from './medicine/doctors';
import { PagePatientsComponent } from './medicine/patients';
import { PageDoctorProfileComponent } from './medicine/doctor-profile';
import { PagePaymentsComponent } from './medicine/payments';
import { PageAppointmentsComponent } from './medicine/appointments';
import { PageDepartmentsComponent } from './medicine/departments';
import { Page404Component } from './page-404';
import { PageLeafletMapsComponent } from './ui/maps/leaflet-maps';
import { PageVTimelineComponent } from './ui/components/v-timeline';
import { PagePatientProfileComponent } from './medicine/patient-profile';
import { PageInvoiceComponent } from './apps/service-pages/invoice';
import { PagePricingComponent } from './apps/service-pages/pricing';
import { PageTimelineComponent } from './apps/service-pages/timeline';
import { PageUserProfileComponent } from './apps/service-pages/user-profile';
import { PageEditAccountComponent } from './apps/service-pages/edit-account';
import { PageCalendarComponent } from './apps/service-pages/calendar';
import { PageSignInComponent } from './apps/sessions/sign-in';
import { PageSignUpComponent } from './apps/sessions/sign-up';
import { PageSettingsComponent } from './settings';
import { PageHospitalsComponent } from './medicine/hospitals/hospitals.component';
import { EditHospitalComponent } from './apps/Edit/edit-hospital/edit-hospital.component';
import { EditCustomerComponent } from './apps/Edit/edit-customer/edit-customer.component';
import { EditDoctorComponent } from './apps/Edit/edit-doctor/edit-doctor.component';
import { EditAppointmentComponent } from './apps/Edit/edit-appointment/edit-appointment.component';
import { EditEmployeeComponent } from './apps/Edit/edit-employee/edit-employee.component';
import { EditAdministratorComponent } from './apps/Edit/edit-administrator/edit-administrator.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { EmployeesComponent } from './medicine/employees/employees.component';
import { RegisterPatientComponent } from './apps/register/register-patient/register-patient.component';
import { RegisterDoctorComponent } from './apps/register/register-doctor/register-doctor.component';
import { RegisterEmployeeComponent } from './apps/register/register-employee/register-employee.component';
import { RegisterHospitalComponent } from './apps/register/register-hospital/register-hospital.component';
import { RegisterAppointmentComponent } from './apps/register/register-appointment/register-appointment.component';
import { AppointmentHistoryComponent } from './medicine/appointment-history/appointment-history.component';
import { RegisterDepartmentComponent } from './apps/register/register-department/register-department.component';
import { EditDepartmentComponent } from './apps/Edit/edit-department/edit-department.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ChartsModule,
    NgxChartsModule,
    NgxEchartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    LeafletModule,
    FullCalendarModule,

    UIModule,
    LayoutModule,
    MaterialModule
  ],
  declarations: [
    BasePageComponent,
    PageDashboardComponent,
    PageAlertsComponent,
    PageButtonsComponent,
    PageCardsComponent,
    PageInputsComponent,
    PageSelectsComponent,
    PageTextareasComponent,
    PageAutocompletesComponent,
    PageBadgesComponent,
    PageRatingsComponent,
    PageCheckboxesComponent,
    PageRadioButtonsComponent,
    PageSwitchersComponent,
    PageTypographyComponent,
    PageSimpleTablesComponent,
    PageSortingTableComponent,
    PageSearchTableComponent,
    PageFilterTableComponent,
    PagePaginationTableComponent,
    PageFormElementsComponent,
    PageFormLayoutsComponent,
    PageFormValidationComponent,
    PageNg2ChartsComponent,
    PageNgxChartsComponent,
    PageNgxEchartsComponent,
    PageGoogleMapsComponent,
    PageWorldMapComponent,
    PageIconsOptionsComponent,
    PageIconsIfComponent,
    PageIconsSliComponent,
    PageContactsComponent,
    PageDoctorsComponent,
    PagePatientsComponent,
    PageModalWindowsComponent,
    PageDoctorProfileComponent,
    PagePaymentsComponent,
    PageAppointmentsComponent,
    PageDepartmentsComponent,
    Page404Component,
    PageLeafletMapsComponent,
    PageVTimelineComponent,
    PagePatientProfileComponent,
    PageInvoiceComponent,
    PagePricingComponent,
    PageTimelineComponent,
    PageUserProfileComponent,
    PageEditAccountComponent,
    PageCalendarComponent,
    PageSignInComponent,
    PageSignUpComponent,
    PageSettingsComponent,
    PageHospitalsComponent,
    EditHospitalComponent,
    EditCustomerComponent,
    EditDoctorComponent,
    EditAppointmentComponent,
    EditEmployeeComponent,
    EditAdministratorComponent,
    AccessDeniedComponent,
    EmployeesComponent,
    RegisterPatientComponent,
    RegisterDoctorComponent,
    RegisterEmployeeComponent,
    RegisterHospitalComponent,
    RegisterAppointmentComponent,
    AppointmentHistoryComponent,
    RegisterDepartmentComponent,
    EditDepartmentComponent,
  ],
  exports: [],
  entryComponents: []
})
export class PagesModule { }
