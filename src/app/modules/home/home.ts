import { Component } from '@angular/core';
import {ModuleCardComponent} from '../../shared/components/module-card/module-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [
    ModuleCardComponent,
  ],
  styleUrl: './home.css'
})
export class Home {
  modules = [
    {
      title: 'Path Finder',
      image: '/pathfinder-module.jpg',
      route: '/pathfinder'
    },
    {title: 'Hospital Management',
    image: '/hospital-module.jpg',
    route: '/hospital'}
    ];
}

