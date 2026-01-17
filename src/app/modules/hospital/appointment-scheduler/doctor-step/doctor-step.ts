import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {DoctorDto} from '../../../../core/models/hospital/DoctorDto';
import {EntityPickerComponent} from '../../../../shared/components/entity-picker/entity-picker.component';

@Component({
  selector: 'app-doctor-step',
  imports: [
    EntityPickerComponent
  ],
  templateUrl: './doctor-step.html',
  styleUrl: './doctor-step.css'
})
export class DoctorStep {
  @Input() doctors: DoctorDto[] = [];
  @Input() loadingDoctors: boolean = false;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;

  @Output() selectDoctor = new EventEmitter<string>();
  @Output() searchDoctors = new EventEmitter<string | null>();
  @Output() pageChange = new EventEmitter<number>();

  get vm() {
    return (this.doctors ?? []).map((d): {id: string, displayName: string, subtitle: string} => ({
      id: d.id,
      displayName: `Dr. ${d.fullName.firstName} ${d.fullName.lastName}`,
      subtitle: d.specialisation,
    }));
  }
}
