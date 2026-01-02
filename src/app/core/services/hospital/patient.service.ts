import {Injectable} from '@angular/core';
import {environment} from '../../../../env/environment';
import { HttpClient } from '@angular/common/http';
import {PatientDto} from '../../models/pathfinder/PatientDto';
import {AddPatientDto} from '../../models/pathfinder/AddPatientDto';
import {BaseService} from './base.service';

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<PatientDto, AddPatientDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/patients`);
  }
}
