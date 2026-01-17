import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/environment';
import {Appointment} from '../../models/hospital/Appointment';
import {AddAppointmentDto} from '../../models/hospital/AddAppointmentDto';

import {Injectable} from '@angular/core';
import {DoctorAvailability} from '../../models/hospital/DoctorAvailability';

@Injectable({ providedIn: 'root' })
export class AppointmentService extends BaseService<Appointment, AddAppointmentDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/appointments`);
  }


  getPatientAppointments(patientId: string) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/hospital/appointments/patients/${patientId}`);
  }

  getDoctorAppointments(doctorId: string) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/hospital/appointments/doctors/${doctorId}`);
  }
  getDoctorAvailability(doctorId: string, from: string, to: string) {
    return this.http.get<DoctorAvailability[]>(`${environment.apiUrl}/hospital/appointments/doctors/${doctorId}/availability`, {
      params: {from, to}
    });
  }

  completeAppointment(appointmentId: string) {
    return this.http.post(`${environment.apiUrl}/hospital/appointments/${appointmentId}/complete`, {});
  }
}
