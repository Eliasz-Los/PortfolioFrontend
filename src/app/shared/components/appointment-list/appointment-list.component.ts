import {Component, Input} from '@angular/core';
import {Appointment} from '../../../core/models/hospital/Appointment';
import {AppointmentService} from '../../../core/services/hospital/appointment.service';
import {DatePipe} from '@angular/common';
import {AppointmentStatus} from '../../../core/models/hospital/types/AppointmentStatus';

@Component({
  selector: 'app-appointment-list',
  imports: [
    DatePipe
  ],
  templateUrl: './appointment-list.component.html',
})
export class AppointmentListComponent {
 @Input() patientsAppointments: boolean = true;
 @Input() id: string = '';
 appointments: Appointment[] = [];
 isLoading: boolean = true;

 constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
      if(this.patientsAppointments) {
       this.appointmentService.getPatientAppointments(this.id).subscribe((appointments) => {
         this.appointments = appointments;
         this.isLoading = false;
       });
      }else{
        this.loadDoctorAppointments(this.id);
      }
  }

  protected readonly AppointmentStatus = AppointmentStatus;

  markCompleted(id: string) {
    this.appointmentService.completeAppointment(id).subscribe((appointment) => {
        this.loadDoctorAppointments(id)
    })
  }

  private loadDoctorAppointments(id: string){
    this.appointmentService.getDoctorAppointments(this.id).subscribe((appointments) => {
      this.appointments = appointments;
      this.isLoading = false;
    })
  }
}
