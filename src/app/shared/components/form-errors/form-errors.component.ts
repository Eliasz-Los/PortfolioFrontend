import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent {
  @Input({ required: true }) control: AbstractControl | null = null;

  get minlengthError():
    | { requiredLength: number; actualLength: number }
    | null {
    return this.control?.errors?.['minlength'] ?? null;
  }

  get minAgeError():
    | { required: number; actual: number }
    | null {
    return this.control?.errors?.['minAge'] ?? null;
  }

  getError<T>(key: string): T | null {
    return (this.control?.errors?.[key] as T) ?? null;
  }

}
