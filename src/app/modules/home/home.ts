import { Component } from '@angular/core';
import {Floorplan} from '../../core/models/Floorplan';
import {PathfinderService} from '../../core/services/pathfinder.service';
import {Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  floorplans: Floorplan[] | undefined;

//TODO make it after that each person can click on the floorplan and choose begin adnd end point to get the best path

  constructor(
    private pathfinderService: PathfinderService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.pathfinderService.getFloorplans().subscribe({
      next: (data) => {
        this.floorplans = data;
      },
      error: (error) => {
        console.error('Error fetching floorplans:', error);
      }
    });
  }

  onFloorplanClick(floorplan: Floorplan) {
  //TODO: mamking it interactive
  }
}
