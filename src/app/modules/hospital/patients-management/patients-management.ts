import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PatientDto } from '../../../core/models/hospital/PatientDto';
import { PatientService } from '../../../core/services/hospital/patient.service';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {Router} from '@angular/router';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';
import {PaginationComponent} from '../../../shared/components/pagination/pagination.component';
import {AlertService} from '../../../core/services/alert.service';
import {EntitySearchComponent} from '../../../shared/components/entity-search/entity-search.component';
import {EntitySearchManager} from '../../../shared/utils/EntitySearchManager';

@Component({
  selector: 'app-patients-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    LoadingComponent,
    PaginationComponent,
    EntitySearchComponent
  ],
  templateUrl: './patients-management.html',
  styleUrl: './patients-management.css'
})
export class PatientsManagement extends EntitySearchManager<PatientDto>{
  patients: Observable<PatientDto[]>;
  patientsSnapshot: PatientDto[] = [];
  pageSize = 20;

  constructor(private patientService: PatientService,
              private router: Router,
              alertService: AlertService)
  {
    super(alertService);
    this.patients = this.patientService.getAll();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadAll$().subscribe(list => {
      this.patientsSnapshot = list;
      this.isLoading = false;
    });
  }

  protected override loadAll$(): Observable<PatientDto[]> {
    return this.patientService.getAll();
  }
  protected override search$(term: string): Observable<PatientDto[]> {
    return this.patientService.searchPatients(term);
  }

  get paginatedPatients(): PatientDto[] {
    const patients = this.patientsSnapshot ?? [];
    const start = (this.currentPage - 1) * this.pageSize;
    return patients.slice(start, start + this.pageSize);
  }

  onSearch(term: string | null): void {
    this.onSearchGeneric(term, list => (this.patientsSnapshot = list));
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.patientsSnapshot.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  addPatient(): void {
    this.router.navigate(['hospital/patients/add']);
  }

  viewPatient(id: string) {
    this.router.navigate(['hospital/patients', id]);
  }

  returnToHospitalDashboard() {
    this.router.navigate(['hospital']);
  }


}
