import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ModuleCardComponent} from '../../shared/components/module-card/module-card';

@Component({
  selector: 'app-hospital',
  imports: [
    ModuleCardComponent
  ],
  templateUrl: './hospital.html',
  styleUrl: './hospital.css'
})
export class Hospital {
  modules = [
    {
      title: 'Patient Management',
      image: '/hospital/patients-module.jpg',
      route: '/hospital/patients'
    },
    {
      title: 'Doctor Management',
      image: '/hospital/doctors-module.jpg',
      route: '/hospital/doctors'
    },
    {
      title: 'Appointment Scheduling',
      image: '/hospital/appointments-module.jpg',
      route: '/hospital/appointments'
    }

  ];
}
