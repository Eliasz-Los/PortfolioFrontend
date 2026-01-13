import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {DoctorDto} from '../../../../core/models/hospital/DoctorDto';

@Component({
  selector: 'app-doctor-step',
  imports: [
    LoadingComponent
  ],
  templateUrl: './doctor-step.html',
  styleUrl: './doctor-step.css'
})
export class DoctorStep {
  @Input() doctors: DoctorDto[] = [];
  @Input() loadingDoctors: boolean = false;
  @Output() selectDoctor = new EventEmitter<string>();

  select(id: string){
    this.selectDoctor.emit(id);
  }

}
