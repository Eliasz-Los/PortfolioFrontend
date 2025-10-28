import { Component } from '@angular/core';
import {Floorplan} from '../../core/models/Floorplan';
import {PathfinderService} from '../../core/services/pathfinder.service';
import {Router} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FloorplanViewer} from '../../shared/components/floorplan-viewer/floorplan-viewer';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    FloorplanViewer,
    NgIf
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  floorplans: Floorplan[] | undefined;
  selectedFloorplan: Floorplan | null = null;


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
    this.selectedFloorplan = floorplan;
  }

  onViewerClose() {
    this.selectedFloorplan = null;
  }

  /*trackByFloorplanId(index: number, floorplan: Floorplan): number {
    return floorplan.;
  }*/
}
