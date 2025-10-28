import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Floorplan} from '../../../core/models/Floorplan';
import {Point} from '../../../core/models/Point';
import {PathfinderService} from '../../../core/services/pathfinder.service';
import {PathRequest} from '../../../core/models/PathRequest';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-floorplan-viewer',
  imports: [
    NgStyle
  ],
  templateUrl: './floorplan-viewer.html',
  styleUrl: './floorplan-viewer.css'
})
export class FloorplanViewer {
  @Input() floorplan: Floorplan | null = null;
  @Output() close = new EventEmitter<void>();
  points: Point[] = [];
  routePoints: Point[] = [];

  @ViewChild('image', { read: ElementRef }) imageRef?: ElementRef<HTMLImageElement>;

  constructor(private service: PathfinderService) {}

  closeViewer() {
    this.close.emit();
    this.resetPoints();
  }

  onBackdropClick() {
    this.closeViewer();
    this.resetPoints();
  }

  onDialogClick(event: Event) {
    event.stopPropagation();
  }

  resetPoints() {
    this.points = [];
    this.routePoints = [];
  }


  onPointSelection(event: MouseEvent) {
    const img = this.imageRef?.nativeElement;
    if (!img) return;
    const rect = img.getBoundingClientRect();

    const XWidth = event.clientX - rect.left;
    const YHeight = event.clientY - rect.top;

    const point: Point = { XWidth, YHeight };

    if (this.points.length === 0) {
      this.points.push(point);
    } else if (this.points.length === 1) {
      this.points.push(point);
    } else {
      this.points[1] = point;
    }
  }

  markerStyle(p: Point) {
    const img = this.imageRef?.nativeElement;
    if (!img) return {};

    const left = Math.max(0, Math.min(100, (p.XWidth / img.width) * 100));
    const top  = Math.max(0, Math.min(100, (p.YHeight / img.height) * 100));

    return {
      left: `${left}%`,
      top: `${top}%`
    };
  }

/*api call to get the right routePoints t odraw from a to b*/
  getRoute() {
    if (this.floorplan && this.points.length === 2) {
      console.log('Points:', this.points);
      console.log('Marker style:', this.markerStyle(this.points[0]));
      const pathReq: PathRequest = {
        floorplanName: this.floorplan.name,
        floorNumber: this.floorplan.floorNumber,
        start: this.points[0],
        end: this.points[1]
      };

      this.service.getRouteForFloorplan(pathReq).subscribe({
        next: (data) => {
          this.routePoints = data;
          console.log(this.routePoints);


          console.log('routePoints count (display coords):', this.routePoints.length);
        },
        error: (error) => {
          console.error('Error fetching route:', error);
        }
      });
    }
  }


/*TODO: finite doesnt seem to help to get the points being drawn perhaps other lib or another method instead of svg*/
  getSvgViewBox(): string {
    const img = this.imageRef?.nativeElement;
    if (!img) return '0 0 0 0';
    return `0 0 ${img.width} ${img.height}`;
  }

 /* getPolylinePoints(): string {
  // join display coordinates as "x,y x,y ..." for the svg polyline
  return this.routePoints
    .map(p => `${p.XWidth},${p.YHeight}`)
    .join(' ');
  }*/
  // returns empty string if route is not valid (safe for [attr.points])
  getPolylinePoints(): string {
    if (!this.routePoints || this.routePoints.length === 0) return '';
    // ensure each point has finite numbers
    const ok = this.routePoints.every(p =>
      p && isFinite(Number(p.XWidth)) && isFinite(Number(p.YHeight))
    );
    if (!ok) return '';
    return this.routePoints.map(p => `${Number(p.XWidth)},${Number(p.YHeight)}`).join(' ');
  }

  hasRoute(): boolean {
    return this.routePoints.length > 0;
  }


}
