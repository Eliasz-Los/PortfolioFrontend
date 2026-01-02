import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgStyle} from '@angular/common';
import {PathRequest} from '../../core/models/pathfinder/PathRequest';
import {Floorplan} from '../../core/models/pathfinder/Floorplan';
import {Point} from '../../core/models/pathfinder/Point';
import {PathfinderService} from '../../core/services/pathfinder.service';
import {Router} from '@angular/router';
import {FloorplanViewerComponent} from './floorplan-viewer/floorplan-viewer';

@Component({
  selector: 'app-path-finder',
  imports: [NgStyle, FloorplanViewerComponent],
  templateUrl: './path-finder.html',
  styleUrl: './path-finder.css'
})
export class PathFinder {
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
