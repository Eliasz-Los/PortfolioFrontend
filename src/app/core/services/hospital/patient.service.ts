import {Injectable} from '@angular/core';
import {environment} from '../../../../env/environment';
import { HttpClient } from '@angular/common/http';
import {PatientDto} from '../../models/pathfinder/PatientDto';
import {AddPatientDto} from '../../models/pathfinder/AddPatientDto';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = `${environment.apiUrl}/hospital/patients`;
  constructor(private http: HttpClient) {}

  getPatients() { return this.http.get<PatientDto[]>(this.baseUrl); }
  getPatientById(id: string) { return this.http.get<PatientDto>(`${this.baseUrl}/${id}`); }
  addPatient(dto: AddPatientDto) { return this.http.post<PatientDto>(this.baseUrl, dto); }
  deletePatient(id: string) { return this.http.delete(`${this.baseUrl}/${id}`); }
}
