import {PatientDto} from './PatientDto';
import {DoctorDto} from './DoctorDto';

export interface Appointment {
  id: string;
  appointmentDate: string;
  patient: PatientDto;
  doctor: DoctorDto;
}
