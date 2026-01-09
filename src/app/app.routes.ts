import { Routes } from '@angular/router';
import {Home} from './modules/home/home';
import {About} from './modules/about/about';
import {Contact} from './modules/contact/contact';
import {PathFinder} from './modules/path-finder/path-finder';
import {Hospital} from './modules/hospital/hospital';
import {PatientsManagement} from './modules/hospital/patients-management/patients-management';
import {DoctorsManagement} from './modules/hospital/doctors-management/doctors-management';
import {AppointmentScheduler} from './modules/hospital/appointment-scheduler/appointment-scheduler';
import {PatientDetails} from './modules/hospital/patients-management/patient-details/patient-details';
import {AddPatientComponent} from './modules/hospital/patients-management/add-patient/add-patient';
import {DoctorDetails} from './modules/hospital/doctors-management/doctor-details/doctor-details';
import {AddDoctor} from './modules/hospital/doctors-management/add-doctor/add-doctor';

export const routes: Routes = [
  {path:'', component: Home, pathMatch: 'full'},
  {path:'about', component: About, pathMatch: 'full'},
  {path:'contact', component: Contact, pathMatch: 'full'},
  {path: 'pathfinder', component: PathFinder, pathMatch: 'full'},
  {path: 'hospital', component: Hospital, pathMatch: 'full'},
  {path: 'hospital/patients', component: PatientsManagement, pathMatch: 'full'},
  { path: 'hospital/patients/add', component: AddPatientComponent, pathMatch: 'full' },
  { path: 'hospital/patients/:id', component: PatientDetails, pathMatch: 'full' },
  {path: 'hospital/doctors', component: DoctorsManagement, pathMatch: 'full'},
  {path: 'hospital/doctors/add', component: AddDoctor, pathMatch: 'full'},
  {path: 'hospital/doctors/:id', component: DoctorDetails, pathMatch: 'full'},
  {path: 'hospital/appointments', component: AppointmentScheduler, pathMatch: 'full'},
];
