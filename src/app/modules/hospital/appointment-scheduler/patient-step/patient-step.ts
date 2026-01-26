import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientDto} from '../../../../core/models/hospital/PatientDto';
import {EntityPickerViewModel} from '../../../../core/models/hospital/EntityPickerViewModel';
import {EntityPickerComponent} from '../../../../shared/components/entity-picker/entity-picker.component';

@Component({
  selector: 'app-patient-step',
  imports: [
    EntityPickerComponent
  ],
  templateUrl: './patient-step.html',
  styleUrl: './patient-step.css'
})
export class PatientStep{

  @Input() patients: PatientDto[] = [];
  @Input() loadingPatients: boolean = false;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;

  @Output() selectPatient = new EventEmitter<string>();
  @Output() searchPatients = new EventEmitter<string | null>();
  @Output() pageChange = new EventEmitter<number>();

  get vm(): EntityPickerViewModel[] {
    return (this.patients ?? []).map((p): EntityPickerViewModel => ({
      id: p.id,
      displayName: `${p.fullName.firstName} ${p.fullName.lastName}`,
      subtitle: p.dateOfBirth,
    }));
  }
}
