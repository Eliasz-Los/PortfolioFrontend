import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function locationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) return null;

    const city = control.get('city')?.value;
    const country = control.get('country')?.value;

    return city || country
      ? null
      : { locationRequired: true };
  };
}
