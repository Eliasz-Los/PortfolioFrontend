import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  const regex = /^\+?[0-9]{7,15}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString().trim();
    if (!value) return null;

    return regex.test(value)
      ? null
      : { phoneInvalid: true };
  };
}
