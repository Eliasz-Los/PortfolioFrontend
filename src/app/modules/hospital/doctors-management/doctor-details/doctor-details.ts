import { Component } from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {DoctorDto} from '../../../../core/models/hospital/DoctorDto';
import {DoctorService} from '../../../../core/services/hospital/doctor.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {AppointmentListComponent} from '../../../../shared/components/appointment-list/appointment-list.component';

@Component({
  selector: 'app-doctor-details',
  imports: [
    AsyncPipe,
    RouterLink,
    AppointmentListComponent
  ],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css'
})
export class DoctorDetails {
  doctor: Observable<DoctorDto>
  doctorId!: string;
  showDeleteModal = false;

  constructor(private route: ActivatedRoute,
              private doctorService: DoctorService,
              private router: Router){
    this.doctor = this.route.paramMap.pipe(
      switchMap(params => {
        return this.doctorService.getById(params.get('id')!);
      })
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id')!;
    });
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.doctorService.delete(this.doctorId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.router.navigate(['/hospital/doctors']);
      }
    });
  }

}
