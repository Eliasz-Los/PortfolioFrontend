import { Routes } from '@angular/router';
import {Home} from './modules/home/home';
import {About} from './modules/about/about';
import {Contact} from './modules/contact/contact';

export const routes: Routes = [
  {path:'', component: Home, pathMatch: 'full'},
  {path:'about', component: About, pathMatch: 'full'},
  {path:'contact', component: Contact, pathMatch: 'full'},
];
