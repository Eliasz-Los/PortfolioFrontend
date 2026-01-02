import {Injectable} from '@angular/core';
import {environment} from '../../../env/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Floorplan} from '../models/hospital/Floorplan';
import {PathRequest} from '../models/hospital/PathRequest';
import {Point} from '../models/hospital/Point';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFloorplans(): Observable<Floorplan[]> {
    return this.http.get<Floorplan[]>(`${this.apiUrl}/Floorplan/floorplans`);
  }

  getRouteForFloorplan(pathReq: PathRequest): Observable<Point[]> {
    return this.http.post<Point[]>(`${this.apiUrl}/path/route`, pathReq);
  }

}
