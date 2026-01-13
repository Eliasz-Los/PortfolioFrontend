import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AddAppointmentDto} from '../../../../core/models/hospital/AddAppointmentDto';
import {PatientDto} from '../../../../core/models/hospital/PatientDto';
import {DoctorDto} from '../../../../core/models/hospital/DoctorDto';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-overview-step',
  imports: [
    DatePipe
  ],
  templateUrl: './overview-step.html',
  styleUrl: './overview-step.css'
})
export class OverviewStep {
  @Input() state!: AddAppointmentDto;
  @Input() patients: PatientDto[] = [];
  @Input() doctors: DoctorDto[] = [];

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  getPatientName(): string {
    const patient = this.patients.find(p => p.id === this.state.patientId);
    return patient ? `${patient.fullName.firstName} ${patient.fullName.lastName}` : '';
  }

  getDoctorName(): string {
    const doctor = this.doctors.find(d => d.id === this.state.doctorId);
    return doctor ? `${doctor.fullName.firstName} ${doctor.fullName.lastName}` : '';
  }
}
