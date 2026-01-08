import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString().trim();
    if (!value) return null;

    return nameRe.test(value)
      ? { forbiddenName: { value } }
      : null;
  };
}

export function nameValidator(
  minLength = 3,
  forbidden?: ValidatorFn
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString().trim();

    if (!value) return { required: true };

    if (value.length < minLength) {
      return {
        minlength: {
          requiredLength: minLength,
          actualLength: value.length
        }
      };
    }

    if (forbidden) {
      return forbidden(control);
    }

    return null;
  };
}
