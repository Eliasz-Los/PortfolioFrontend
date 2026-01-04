import {Component} from '@angular/core';
import {PatientDto} from '../../../../core/models/hospital/PatientDto';
import {PatientService} from '../../../../core/services/hospital/patient.service';
import {Observable, switchMap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-patient-details',
  imports: [
    AsyncPipe,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css'
})
export class PatientDetails {
  patient : Observable<PatientDto>;
  patientId!: string;
  showDeleteModal = false;

  constructor(private patientService : PatientService,
              private route: ActivatedRoute,
              private router: Router)
  {
    this.patient = this.route.paramMap.pipe(
      switchMap(params => {
        return this.patientService.getById(params.get('id')!);
      })
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id')!;
    });
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.patientService.delete(this.patientId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.router.navigate(['/hospital/patients']);
      }
    });
  }

}
