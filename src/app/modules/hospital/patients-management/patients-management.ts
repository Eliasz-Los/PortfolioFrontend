import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PatientDto } from '../../../core/models/hospital/PatientDto';
import { PatientService } from '../../../core/services/hospital/patient.service';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patients-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './patients-management.html',
  styleUrl: './patients-management.css'
})
export class PatientsManagement {
  patients: Observable<PatientDto[]>;

  displayedColumns: string[] = [
    'fullName',
    'dateOfBirth',
    'email',
    'phoneNumber',
    'actions'
  ];

  constructor(private patientService: PatientService,
              private router: Router)
  {
    this.patients = this.patientService.getAll();
  }

  viewPatient(id: string) {
    this.router.navigate(['/hospital/patients', id]);
  }

  deletePatient(id: string) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.delete(id).subscribe(() => {
        this.patients = this.patientService.getAll();
      });
    }
  }
}
