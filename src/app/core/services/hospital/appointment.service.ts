import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/environment';
import {Appointment} from '../../models/hospital/Appointment';
import {AddAppointmentDto} from '../../models/hospital/AddAppointmentDto';

import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AppointmentService extends BaseService<Appointment, AddAppointmentDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/appointments`);
  }
}
