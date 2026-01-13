import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {PatientService} from '../../../../core/services/hospital/patient.service';
import {AddPatientDto} from '../../../../core/models/hospital/AddPatientDto';
import {CommonModule} from '@angular/common';
import {Name} from '../../../../core/models/hospital/types/Name';
import {Location} from '../../../../core/models/hospital/types/Location';
import {FormErrorsComponent} from '../../../../shared/components/form-errors/form-errors.component';
import {
  dateOfBirthValidator,
  forbiddenNameValidator,
  nameValidator,
  phoneNumberValidator
} from '../../../../shared/validators';
import {AlertService} from '../../../../core/services/alert.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorsComponent
  ],
  templateUrl: './add-patient.html',
  styleUrls: ['./add-patient.css']
})
export class AddPatientComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: this.fb.group({
        firstName: new FormControl('', { nonNullable: true, validators: [nameValidator(2, forbiddenNameValidator(/bob/i))] }),
        lastName: new FormControl('', { nonNullable: true, validators: [nameValidator(2)] }),
      }),

      dateOfBirth: new FormControl('', {
        validators: [Validators.required, dateOfBirthValidator(0)]
      }),

      email: new FormControl('', { validators: [Validators.required, Validators.email] }),

      phoneNumber: new FormControl('', { validators: [Validators.required, phoneNumberValidator()] }),

      location: this.fb.group({
        streetName: [''],
        streetNumber: [''],
        city: new FormControl('', Validators.required),
        postalCode: [''],
        country: ['', Validators.required],
      })
    });
  }

  private mapToAddPatientDto(): {
    fullName: Name;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    location: Location;
  } {
    const formValue = this.form.value;

    return {
      fullName: {
        firstName: formValue.fullName!.firstName!,
        lastName: formValue.fullName!.lastName!
      },
      dateOfBirth: formValue.dateOfBirth ? formValue.dateOfBirth.slice(0,10) : null,
      email: formValue.email!,
      phoneNumber: formValue.phoneNumber!,
      location: {
        streetName: formValue.location!.streetName!,
        streetNumber: formValue.location?.streetNumber!,
        city: formValue.location!.city!,
        postalCode: formValue.location!.postalCode!,
        country: formValue.location!.country!
      }
    };
  }



  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.mapToAddPatientDto();

    this.patientService.create(dto).subscribe({
      next: () => {
        this.alertService.success('Patient added successfully.');
        this.router.navigate(['/hospital/patients'])
      },
      error: (err) => {
        console.error('Error creating patient:', err)
        this.alertService.error("Failed to add patient.");
      }
    });
  }



  cancel(): void {
    this.router.navigate(['/hospital/patients']);
  }

}
