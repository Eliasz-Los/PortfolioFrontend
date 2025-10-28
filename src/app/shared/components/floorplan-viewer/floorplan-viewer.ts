import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Floorplan} from '../../../core/models/Floorplan';
import {Point} from '../../../core/models/Point';
import {PathfinderService} from '../../../core/services/pathfinder.service';
import {PathRequest} from '../../../core/models/PathRequest';
import {NgStyle} from '@angular/common';

//TODO perhaps lets split some of the logic for better maintainability
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

    // Get click position relative to displayed image
    const xDisplay = event.clientX - rect.left;
    const yDisplay = event.clientY - rect.top;

    // Scale to actual image pixel resolution
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const xWidth = xDisplay * scaleX;
    const yHeight = yDisplay * scaleY;

    const point: Point = { xWidth, yHeight };

    if (this.points.length === 0) {
      this.points.push(point);
    } else if (this.points.length === 1) {
      this.points.push(point);
    } else {
      this.points[1] = point;
    }

    console.log({ clickY: event.clientY, rectTop: rect.top, yDisplay, yHeight });
  }

  markerStyle(p: Point) {
    const img = this.imageRef?.nativeElement;
    if (!img || img.width === 0 || img.height === 0) return {};

    const { scaleX, scaleY } = this.scaleXandY();

    const left = Math.max(0, Math.min(100, (p.xWidth * scaleX / img.clientWidth) * 100));
    const top  = Math.max(0, Math.min(100, (p.yHeight * scaleY / img.clientHeight) * 100));

    return { left: `${left}%`, top: `${top}%` };
  }

/*api call to get the right route consisted of a list of points  to draw from a to b*/
  getRoute() {
    if (this.floorplan && this.points.length === 2) {

      const pathReq: PathRequest = {
        floorplanName: this.floorplan.name,
        floorNumber: this.floorplan.floorNumber,
        start: this.points[0],
        end: this.points[1]
      };

      this.service.getRouteForFloorplan(pathReq).subscribe({
        next: (data) => {
          this.routePoints = data;
          console.log('routePoints count (display coords):', this.routePoints.length);
        },
        error: (error) => {
          console.error('Error fetching route:', error);
        }
      });
    }
  }


  getSvgViewBox(): string {
    const img = this.imageRef?.nativeElement;
    if (!img) return '0 0 0 0';
    return `0 0 ${img.width} ${img.height}`;
  }

  getPolylinePoints(): string {
    const img = this.imageRef?.nativeElement;
    if (!img || !this.routePoints?.length) return '';

    const { scaleX, scaleY } = this.scaleXandY();

    return this.routePoints
      .map(p => `${p.xWidth * scaleX},${p.yHeight * scaleY}`)
      .join(' ')
  }

  hasRoute(): boolean {
    return this.routePoints.length > 0;
  }

  scaleXandY(): {scaleX: number, scaleY: number} {
    const img = this.imageRef?.nativeElement;

    const scaleX = img!.clientWidth / img!.naturalWidth;
    const scaleY = img!.clientHeight / img!.naturalHeight;
    return { scaleX, scaleY };
  }


}
