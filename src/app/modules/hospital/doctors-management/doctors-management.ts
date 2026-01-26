import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {DoctorDto} from '../../../core/models/hospital/DoctorDto';
import { DoctorService } from '../../../core/services/hospital/doctor.service';
import {Router} from '@angular/router';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';
import {PaginationComponent} from '../../../shared/components/pagination/pagination.component';
import {Specialisation} from '../../../core/models/hospital/types/Specialisation';
import {EntitySearchComponent} from '../../../shared/components/entity-search/entity-search.component';
import {AlertService} from '../../../core/services/alert.service';
import {EntitySearchManager} from '../../../shared/utils/EntitySearchManager';

@Component({
  selector: 'app-doctors-management',
  imports: [
    LoadingComponent,
    PaginationComponent,
    EntitySearchComponent
  ],
  templateUrl: './doctors-management.html',
  styleUrl: './doctors-management.css'
})
export class DoctorsManagement extends EntitySearchManager<DoctorDto> {
  doctors: Observable<DoctorDto[]>;
  pageSize = 20;
  doctorsSnapshot: DoctorDto[] = [];

  constructor(private doctorService: DoctorService,
              private router: Router, alertService: AlertService){
    super(alertService);
    this.doctors = this.doctorService.getAll();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadAll$().subscribe(list => {
      this.doctorsSnapshot = list;
      this.isLoading = false;
    })
  }

  get paginatedDoctors(): DoctorDto[] {
    const doctors = this.doctorsSnapshot ?? [];
    const start = (this.currentPage - 1) * this.pageSize;
    return doctors.slice(start, start + this.pageSize);
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.doctorsSnapshot.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  addDoctor(): void {
    this.router.navigate(['/hospital/doctors/add']);
  }

  viewDoctor(doctorId: string): void {
    this.router.navigate([`/hospital/doctors/${doctorId}`]);
  }

  returnToHospitalDashboard(): void {
    this.router.navigate(['/hospital']);
  }

  protected override loadAll$(): Observable<DoctorDto[]> {
    return this.doctorService.getAll();
  }
  protected override search$(term: string): Observable<DoctorDto[]> {
    return this.doctorService.searchDoctors(term);
  }

  onSearch(term: string | null): void {
    this.onSearchGeneric(term, list => (this.doctorsSnapshot = list));
  }
}
