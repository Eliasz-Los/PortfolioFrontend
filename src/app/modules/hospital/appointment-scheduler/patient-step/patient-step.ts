import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientDto} from '../../../../core/models/hospital/PatientDto';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-patient-step',
  imports: [
    LoadingComponent
  ],
  templateUrl: './patient-step.html',
  styleUrl: './patient-step.css'
})
export class PatientStep {
  @Input() patients: PatientDto[] = [];
  @Input() loadingPatients: boolean = false;

  @Output() selectPatient = new EventEmitter<string>();

  select(id: string){
    this.selectPatient.emit(id);
  }
}
