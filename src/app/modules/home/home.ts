import { Component } from '@angular/core';
import {ModuleCardComponent} from '../../shared/components/module-card/module-card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [
    CommonModule,
    ModuleCardComponent,
  ],
  styleUrl: './home.css'
})
export class Home {
  modules = [
    {
      title: 'Path Finder',
      image: 'assets/pathfinder-module.jpg',
      route: '/pathfinder'
    },
    {
    title: 'Hospital Management',
    image: 'assets/hospital/hospital-module.jpg',
    route: '/hospital'
    },
    {
      title: 'DocuGroup',
      image: 'assets/docugroup/docugroup.jpg',
      route: '/docugroup'
    }
    ];
}

