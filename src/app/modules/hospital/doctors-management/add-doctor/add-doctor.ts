import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DoctorService} from '../../../../core/services/hospital/doctor.service';
import {Router} from '@angular/router';
import {forbiddenNameValidator, nameValidator} from '../../../../shared/validators';
import {Name} from '../../../../core/models/hospital/types/Name';
import {Location} from '../../../../core/models/hospital/types/Location';
import {Specialisation} from '../../../../core/models/hospital/types/Specialisation';
import {FormErrorsComponent} from '../../../../shared/components/form-errors/form-errors.component';
import {AlertService} from '../../../../core/services/alert.service';

@Component({
  selector: 'app-add-doctor',
  imports: [
    FormErrorsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.css'
})
export class AddDoctor {
  form! : FormGroup;
  specialisations = Object.values(Specialisation);

  constructor(private fb : FormBuilder,
              private doctorService : DoctorService,
              private router : Router,
              private alertService: AlertService) {}


    ngOnInit(): void {
      this.form = this.fb.group({
        fullName: this.fb.group({
          firstName: new FormControl('', {
            nonNullable: true,
            validators: [nameValidator(2, forbiddenNameValidator(/bob/i))]
          }),
          lastName: new FormControl('', {nonNullable: true, validators: [nameValidator(2)]}),
        }),
        specialisation: new FormControl('', {nonNullable: true}),
        workAddress: this.fb.group({
          streetName: [''],
          streetNumber: [''],
          city: new FormControl('', Validators.required),
          postalCode: [''],
          country: ['', Validators.required],
        })
      })
    }

    private maptToAddDoctorDto():  {
      fullName: Name;
      specialisation: Specialisation;
      workAddress: Location
    }{
        const formValue = this.form.value;
        return {
          fullName: {
            firstName: formValue.fullName!.firstName!,
            lastName: formValue.fullName!.lastName!
          },
            specialisation: formValue.specialisation!,
            workAddress: {
                streetName: formValue.workAddress!.streetName!,
                streetNumber: formValue.workAddress!.streetNumber!,
                city: formValue.workAddress!.city!,
                postalCode: formValue.workAddress!.postalCode!,
                country: formValue.workAddress!.country!
            }
        }
    }

    submit(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      const dto = this.maptToAddDoctorDto();

      this.doctorService.create(dto).subscribe({
        next: () => {
          this.alertService.success('Doctor added successfully.');
          this.router.navigate(['/hospital/doctors']);
        },
        error: () => {
          this.alertService.error('Failed to add doctor.');
        }
      });
    }

    cancel(): void {
      this.router.navigate(['/hospital/doctors']);
    }
}
