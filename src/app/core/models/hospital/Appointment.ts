import {PatientDto} from './PatientDto';
import {DoctorDto} from './DoctorDto';
import {AppointmentStatus} from './types/AppointmentStatus';

export interface Appointment {
  id: string;
  appointmentDate: string;
  appointmentStatus: AppointmentStatus;
  patient: PatientDto;
  doctor: DoctorDto;
}
