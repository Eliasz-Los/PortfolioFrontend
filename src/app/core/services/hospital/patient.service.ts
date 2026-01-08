import {Injectable} from '@angular/core';
import {environment} from '../../../../env/environment';
import { HttpClient } from '@angular/common/http';
import {PatientDto} from '../../models/hospital/PatientDto';
import {AddPatientDto} from '../../models/hospital/AddPatientDto';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {InvoiceDto} from '../../models/hospital/InvoiceDto';

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<PatientDto, AddPatientDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/patients`);
  }

  getInvoicesForPatient(patientId: string): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>(`${environment.apiUrl}/hospital/patients/${patientId}/invoices`);
  }
}
