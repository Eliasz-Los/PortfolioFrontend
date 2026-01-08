import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../env/environment';
import {Observable} from 'rxjs';
import {Floorplan} from '../models/pathfinder/Floorplan';
import {PathRequest} from '../models/pathfinder/PathRequest';
import {Point} from '../models/pathfinder/Point';

@Injectable({
  providedIn: 'root'
})
export class PathfinderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFloorplans(): Observable<Floorplan[]> {
    return this.http.get<Floorplan[]>(`${this.apiUrl}/Floorplan/floorplans`);
  }

  getRouteForFloorplan(pathReq: PathRequest): Observable<Point[]> {
    return this.http.post<Point[]>(`${this.apiUrl}/path/route`, pathReq);
  }

}
