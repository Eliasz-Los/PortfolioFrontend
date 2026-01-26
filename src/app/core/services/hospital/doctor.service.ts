import {BaseService} from './base.service';
import {DoctorDto} from '../../models/hospital/DoctorDto';
import {AddDoctorDto} from '../../models/hospital/AddDoctorDto';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../env/environment';
import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctorService extends BaseService<DoctorDto, AddDoctorDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/doctors`);
  }

  searchDoctors(term?: string | null, cancelToken?: AbortSignal): Observable<DoctorDto[]> {
    const params = term ? new HttpParams().set('term', term) : new HttpParams();
    const options: { signal?: AbortSignal; params?: HttpParams } = { params };
    if (cancelToken) options.signal = cancelToken;

    return this.http
      .get<DoctorDto[]>(`${environment.apiUrl}/hospital/doctors/search`, options)
      .pipe(
        catchError(err => {
          if (err?.status === 404) return of([]);
          return of([]);
        })
      );
  }
}
