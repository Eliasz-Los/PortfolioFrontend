import { Component } from '@angular/core';
import {AddAppointmentDto} from '../../../core/models/hospital/AddAppointmentDto';
import {PatientDto} from '../../../core/models/hospital/PatientDto';
import {DoctorDto} from '../../../core/models/hospital/DoctorDto';
import {PatientService} from '../../../core/services/hospital/patient.service';
import {AppointmentService} from '../../../core/services/hospital/appointment.service';
import {DoctorService} from '../../../core/services/hospital/doctor.service';
import {PatientStep} from './patient-step/patient-step';
import {DoctorStep} from './doctor-step/doctor-step';
import {ScheduleStep} from './schedule-step/schedule-step';
import {OverviewStep} from './overview-step/overview-step';
import {AlertService} from '../../../core/services/alert.service';

@Component({
  selector: 'app-appointment-scheduler',
  standalone: true,
  imports: [
    PatientStep,
    DoctorStep,
    ScheduleStep,
    OverviewStep
  ],
  templateUrl: './appointment-scheduler.html',
  styleUrl: './appointment-scheduler.css'
})
export class AppointmentScheduler {
  step: number= 1;
  stepNames = ['Patient', 'Doctor', 'Schedule', 'Overview'];

  state: AddAppointmentDto = {
   appointmentDate: '',
   patientId: '',
   doctorId: ''
 };

 patients: PatientDto[] = [];
 loadingPatients = true;

 doctors: DoctorDto[] = [];
 loadingDoctors = true;

 constructor(private patientService: PatientService,
             private appointmentService: AppointmentService,
             private doctorService: DoctorService,
             private alertService: AlertService) {}

  ngOnInit(): void {
    this.patientService.getAll().subscribe(patients => {
      this.patients = patients;
      this.loadingPatients = false;
    });

  }

  onPatientSelected(patientId: string): void {
    this.state.patientId = patientId;
    this.step = 2;
    this.loadDoctors();
  }


  private loadDoctors() {
    this.doctorService.getAll().subscribe(docs => {
      this.doctors = docs;
      this.loadingDoctors = false;
    })
  }

  onDoctorSelected(doctorId: string): void {
    this.state.doctorId = doctorId;
    this.step = 3;
  }

  onDateSelected(dateTime: string) {
    this.state.appointmentDate = dateTime;
    this.step = 4;
  }

  goToStep(stepNumber: number) {
    if (stepNumber < this.step) {
      this.step = stepNumber;
    }
  }

  getStepColor(stepNumber: number): string {
    if (stepNumber < this.step) {
      return '#28a745'; // green for completed
    } else if (stepNumber === this.step) {
      return '#007bff'; // blue for current
    } else {
      return '#ddd'; // gray for remaining
    }
  }


  confirmAppointment() {
    this.appointmentService.create(this.state).subscribe( {

      next: () => {
        this.alertService.success('Appointment was created successfully.');
        this.reset();
      },
      error: () =>{
        this.alertService.error("Failed scheduling for this hour. Try not to schedule in the past");
      }
    });
  }

  cancelAppointment() {
    this.reset();
  }

  private reset() {
    this.step = 1;
    this.state = { appointmentDate: '', patientId: '', doctorId: '' };
  }


}
