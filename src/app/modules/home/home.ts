import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ModuleCardComponent} from '../../shared/components/module-card/module-card';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [
    ModuleCardComponent,
    NgForOf
  ],
  styleUrl: './home.css'
})
export class Home {
  modules = [
    {
      title: 'Path Finder',
      image: '/pathfinder-module.jpg',
      route: '/pathfinder'
    }];
}

