import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {PatientService} from '../../../../core/services/hospital/patient.service';
import {AddPatientDto} from '../../../../core/models/hospital/AddPatientDto';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-patient.html',
  styleUrl: './add-patient.css'
})
export class AddPatientComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),

      dateOfBirth: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      phoneNumber: ['', Validators.required],

      location: this.fb.group({
        streetName: ['', Validators.required],
        streetNumber: [0, Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  private mapToAddPatientDto(): {
    fullName: { firstName: string; lastName: string };
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    location: { streetName: string; streetNumber: number; city: string; postalCode: string; country: string }
  } {
    const formValue = this.form.value;

    return {
      fullName: {
        firstName: formValue.fullName!.firstName!,
        lastName: formValue.fullName!.lastName!
      },
      dateOfBirth: formValue.dateOfBirth!,
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
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const dto: AddPatientDto = this.mapToAddPatientDto();
    this.patientService.create(dto).subscribe({
      next: () => this.router.navigate(['/hospital/patients']),
      error: (err) => console.error('Error creating patient:', err)
    });
  }



  cancel(): void {
    this.router.navigate(['/hospital/patients']);
  }

}
