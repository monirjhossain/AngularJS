import { AppointmentHistoryComponent } from './../pages/medicine/appointment-history/appointment-history.component';
import { EmployeesComponent } from './../pages/medicine/employees/employees.component';
import { AccessDeniedComponent } from './../pages/access-denied/access-denied.component';
import { RegisterFormComponent } from './../layout/components/register-form/register-form.component';
import { RoleGuard } from './../shared/guards/role.guard';
import { PageHospitalsComponent } from './../pages/medicine/hospitals/hospitals.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerticalLayoutComponent } from '../layout/vertical';
import { HorizontalLayoutComponent } from '../layout/horizontal';
import { PublicLayoutComponent } from '../layout/public';
import { PageDashboardComponent } from '../pages/dashboards/dashboard-1';
import { PageButtonsComponent } from '../pages/ui/components/buttons';
import { PageCardsComponent } from '../pages/ui/components/cards';
import { PageInputsComponent } from '../pages/ui/components/inputs';
import { PageSelectsComponent } from '../pages/ui/components/selects';
import { PageTextareasComponent } from '../pages/ui/components/textareas';
import { PageAutocompletesComponent } from '../pages/ui/components/autocompletes';
import { PageBadgesComponent } from '../pages/ui/components/badges';
import { PageRatingsComponent } from '../pages/ui/components/ratings';
import { PageSimpleTablesComponent } from '../pages/ui/tables/simple-tables';
import { PageSortingTableComponent } from '../pages/ui/tables/sorting-table';
import { PageSearchTableComponent } from '../pages/ui/tables/search-table';
import { PageFilterTableComponent } from '../pages/ui/tables/filter-table';
import { PagePaginationTableComponent } from '../pages/ui/tables/pagination-table';
import { PageAlertsComponent } from '../pages/ui/components/alerts';
import { PageCheckboxesComponent } from '../pages/ui/components/checkboxes';
import { PageRadioButtonsComponent } from '../pages/ui/components/radio-buttons';
import { PageSwitchersComponent } from '../pages/ui/components/switchers';
import { PageFormElementsComponent } from '../pages/ui/forms/form-elements';
import { PageFormLayoutsComponent } from '../pages/ui/forms/form-layouts';
import { PageFormValidationComponent } from '../pages/ui/forms/form-validation';
import { PageNg2ChartsComponent } from '../pages/ui/charts/ng2-charts';
import { PageNgxChartsComponent } from '../pages/ui/charts/ngx-charts';
import { PageNgxEchartsComponent } from '../pages/ui/charts/ngx-echarts';
import { PageGoogleMapsComponent } from '../pages/ui/maps/google-maps';
import { PageWorldMapComponent } from '../pages/ui/maps/world-map';
import { PageTypographyComponent } from '../pages/ui/typography';
import { PageIconsOptionsComponent } from '../pages/ui/icons/icons-options';
import { PageIconsIfComponent } from '../pages/ui/icons/icons-if';
import { PageIconsSliComponent } from '../pages/ui/icons/icons-sli';
import { PageContactsComponent } from '../pages/ui/components/contacts';
import { PageDoctorsComponent } from '../pages/medicine/doctors';
import { PagePatientsComponent } from '../pages/medicine/patients';
import { PageModalWindowsComponent } from '../pages/ui/components/modal-windows';
import { PageDoctorProfileComponent } from '../pages/medicine/doctor-profile';
import { PagePaymentsComponent } from '../pages/medicine/payments';
import { PageAppointmentsComponent } from '../pages/medicine/appointments';
import { PageDepartmentsComponent } from '../pages/medicine/departments';
import { Page404Component } from '../pages/page-404';
import { PageLeafletMapsComponent } from '../pages/ui/maps/leaflet-maps';
import { PageVTimelineComponent } from '../pages/ui/components/v-timeline';
import { PagePatientProfileComponent } from '../pages/medicine/patient-profile';
import { PageInvoiceComponent } from '../pages/apps/service-pages/invoice';
import { PagePricingComponent } from '../pages/apps/service-pages/pricing';
import { PageTimelineComponent } from '../pages/apps/service-pages/timeline';
import { PageUserProfileComponent } from '../pages/apps/service-pages/user-profile';
import { PageEditAccountComponent } from '../pages/apps/service-pages/edit-account';
import { PageCalendarComponent } from '../pages/apps/service-pages/calendar';
import { PageSignInComponent } from '../pages/apps/sessions/sign-in';
import { PageSignUpComponent } from '../pages/apps/sessions/sign-up';
import { PageSettingsComponent } from '../pages/settings';

const VERTICAL_ROUTES: Routes = [
  { path: 'hospitals', component: PageHospitalsComponent, canActivate: [RoleGuard], data: ['1']},
  { path: 'doctors', component: PageDoctorsComponent, canActivate: [RoleGuard], data: ['3','1']},
  { path: 'patients', component: PagePatientsComponent, canActivate: [RoleGuard], data: ['3','1'] },
  { path: 'appointments', component: PageAppointmentsComponent, canActivate: [RoleGuard], data: ['3','1'] },
  { path: 'appointments-history', component: AppointmentHistoryComponent,canActivate: [RoleGuard], data: ['3','1'] },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoleGuard], data: ['2','1'] },
  { path: 'departments', component: PageDepartmentsComponent, canActivate: [RoleGuard], data: ['2','1','3'] },
  { path: 'default-dashboard', component: PageDashboardComponent, },
  { path: 'doctor-profile', component: PageDoctorProfileComponent },
  { path: 'patient-profile', component: PagePatientProfileComponent },
  { path: 'payments', component: PagePaymentsComponent },


  { path: 'alerts', component: PageAlertsComponent },
  { path: 'buttons', component: PageButtonsComponent },
  { path: 'cards', component: PageCardsComponent },
  { path: 'inputs', component: PageInputsComponent },
  { path: 'selects', component: PageSelectsComponent },
  { path: 'textareas', component: PageTextareasComponent },
  { path: 'autocompletes', component: PageAutocompletesComponent },
  { path: 'badges', component: PageBadgesComponent },
  { path: 'ratings', component: PageRatingsComponent },
  { path: 'checkboxes', component: PageCheckboxesComponent },
  { path: 'contacts', component: PageContactsComponent },
  { path: 'radio-buttons', component: PageRadioButtonsComponent },
  { path: 'switchers', component: PageSwitchersComponent },
  { path: 'modal-windows', component: PageModalWindowsComponent },
  { path: 'v-timeline', component: PageVTimelineComponent },
  { path: 'simple-table', component: PageSimpleTablesComponent },
  { path: 'sorting-table', component: PageSortingTableComponent },
  { path: 'search-table', component: PageSearchTableComponent },
  { path: 'filtering-table', component: PageFilterTableComponent },
  { path: 'pagination-table', component: PagePaginationTableComponent },
  { path: 'form-elements', component: PageFormElementsComponent },
  { path: 'form-layout', component: PageFormLayoutsComponent },
  { path: 'form-validation', component: PageFormValidationComponent },
  { path: 'ng2-charts', component: PageNg2ChartsComponent },
  { path: 'ngx-charts', component: PageNgxChartsComponent },
  { path: 'ngx-echarts', component: PageNgxEchartsComponent },
  { path: 'google-map', component: PageGoogleMapsComponent },
  { path: 'leaflet-map', component: PageLeafletMapsComponent },
  { path: 'world-map', component: PageWorldMapComponent },
  { path: 'typography', component: PageTypographyComponent },
  { path: 'icons-options', component: PageIconsOptionsComponent },
  { path: 'icons-if', component: PageIconsIfComponent },
  { path: 'icons-sli', component: PageIconsSliComponent },

  { path: 'invoices', component: PageInvoiceComponent },
  { path: 'pricing', component: PagePricingComponent },
  { path: 'events-timeline', component: PageTimelineComponent,  },
  { path: 'user-profile', component: PageUserProfileComponent },
  { path: 'edit-account', component: PageEditAccountComponent },
  { path: 'appointment-calendar', component: PageCalendarComponent },
  { path: 'settings', component: PageSettingsComponent },
  { path: '404', component: Page404Component },
  { path: 'register-form', component: RegisterFormComponent },
  { path: '**', component: Page404Component }
];

const PUBLIC_ROUTES: Routes = [
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageSignUpComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/public/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'vertical',
    canActivate: [AuthGuard],
    component: VerticalLayoutComponent,
    children: VERTICAL_ROUTES
  },
  {
    path: 'horizontal',
    canActivate: [AuthGuard],
    component: Page404Component,
    children: VERTICAL_ROUTES
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: '/public/sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [

  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
