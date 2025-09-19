import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../env/environment';
import {Observable} from 'rxjs';
import {Floorplan} from '../models/Floorplan';

@Injectable({
  providedIn: 'root'
})
export class PathfinderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFloorplans(): Observable<Floorplan[]> {
    return this.http.get<Floorplan[]>(`${this.apiUrl}/Floorplan/floorplans`);
  }

  // getRouteForFloorplan(floorplanId: string, start: string, end: string): Observable<string[]> {

}
