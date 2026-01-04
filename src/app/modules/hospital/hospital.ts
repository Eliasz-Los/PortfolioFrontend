import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ModuleCardComponent} from '../../shared/components/module-card/module-card';

@Component({
  selector: 'app-hospital',
  imports: [
    NgOptimizedImage,
    ModuleCardComponent
  ],
  templateUrl: './hospital.html',
  styleUrl: './hospital.css'
})
export class Hospital {
  modules = [
    {
      title: 'Patient Management',
      image: '/patients-module.jpg',
      route: '/hospital/patients'
    },
    {
      title: 'Doctor Management',
      image: '/doctors-module.jpg',
      route: '/doctors'
    },
    {
      title: 'Appointment Scheduling',
      image: '/appointments-module.jpg',
      route: '/appointments'
    }

  ];
}
