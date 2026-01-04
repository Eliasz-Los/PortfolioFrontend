import {Component, Input} from '@angular/core';
import {PatientDto} from '../../../../core/models/hospital/PatientDto';
import {PatientService} from '../../../../core/services/hospital/patient.service';
import {Observable, switchMap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-patient-details',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    AsyncPipe,
    MatIconModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css'
})
export class PatientDetails {
  patient : Observable<PatientDto>;

  constructor(private patientService : PatientService,
              private route: ActivatedRoute)
  {
    this.patient = this.route.paramMap.pipe(
      switchMap(params => {
        return this.patientService.getById(params.get('id')!);
      })
    );
  }

}
