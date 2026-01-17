import {Injectable} from '@angular/core';
import {environment} from '../../../../env/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PatientDto} from '../../models/hospital/PatientDto';
import {AddPatientDto} from '../../models/hospital/AddPatientDto';
import {BaseService} from './base.service';
import {catchError, Observable, of} from 'rxjs';
import {InvoiceDto} from '../../models/hospital/InvoiceDto';

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<PatientDto, AddPatientDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/patients`);
  }

  getInvoicesForPatient(patientId: string): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>(`${environment.apiUrl}/hospital/patients/${patientId}/invoices`);
  }

  searchPatients(term?: string | null, cancelToken?: AbortSignal): Observable<PatientDto[]> {
    const params = term ? new HttpParams().set('term', term) : new HttpParams();
    const options: { signal?: AbortSignal; params?: HttpParams } = { params };
    if (cancelToken) options.signal = cancelToken;

    return this.http
      .get<PatientDto[]>(`${environment.apiUrl}/hospital/patients/search`, options)
      .pipe(
        catchError(err => {
          if (err?.status === 404) return of([]);
          return of([]);
        })
      );
  }
}
