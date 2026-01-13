import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DoctorAvailability} from '../../../../core/models/hospital/DoctorAvailability';
import {AppointmentService} from '../../../../core/services/hospital/appointment.service';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-schedule-step',
  imports: [
    LoadingComponent
  ],
  templateUrl: './schedule-step.html',
  styleUrl: './schedule-step.css'
})
export class ScheduleStep {
  @Input() doctorId!: string;
  @Output() selectDateTime = new EventEmitter<string>();

  availability: DoctorAvailability[] = [];
  loadingAvailability: boolean = true;
  weekStart!: Date;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.weekStart = this.startOfWeek(new Date());
    this.loadAvailability();
  }

  private loadAvailability() {
    this.loadingAvailability = true;
    const from = this.formatDate(this.weekStart);
    const to = this.formatDate(this.addDays(this.weekStart, 6));

    this.appointmentService.getDoctorAvailability(this.doctorId, from, to)
      .subscribe(avails => {
        this.availability = avails;
        this.loadingAvailability = false;
      });
  }

  selectSlot(date: string, hour: number) {
    const dateTime = `${date}T${hour.toString().padStart(2, '0')}:00`;
    this.selectDateTime.emit(dateTime);
  }

  nextWeek(){
    this.weekStart = this.addDays(this.weekStart, 7);
    this.loadAvailability();
  }

  previousWeek(){
    this.weekStart = this.addDays(this.weekStart, -7);
    this.loadAvailability();
  }

  // Utility functions
  private startOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
