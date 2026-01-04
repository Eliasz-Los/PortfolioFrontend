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

  currentPage = 1;
  pageSize = 20;

  constructor(private patientService: PatientService,
              private router: Router)
  {
    this.patients = this.patientService.getAll();
  }

  ngOnInit(): void {
    this.patients.subscribe(patients => {
      this.patientsSnapshot = patients;
    });
  }

  get paginatedPatients(): PatientDto[] {
    const patients = this.patientsSnapshot ?? [];
    const start = (this.currentPage - 1) * this.pageSize;
    return patients.slice(start, start + this.pageSize);
  }

  patientsSnapshot: PatientDto[] = [];

  get totalPages(): number[] {
    const total = Math.ceil(this.patientsSnapshot.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
  }



  viewPatient(id: string) {
    this.router.navigate(['/hospital/patients', id]);
  }
}
