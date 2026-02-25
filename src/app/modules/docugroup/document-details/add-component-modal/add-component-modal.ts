import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ComponentType} from '../../../../core/models/docugroup/doc-components/ComponentType';

@Component({
  selector: 'app-add-component-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-component-modal.html',
  styleUrl: './add-component-modal.css'
})
export class AddComponentModal {
  @Input({ required: true }) open = false;

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{ content: string; type: ComponentType }>();

  readonly ComponentType = ComponentType;

  content = new FormControl<string>('', { nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)] });
  type = new FormControl<ComponentType>(ComponentType.Paragraph,
    { nonNullable: true, validators: [Validators.required] });

  submit() {
    if (this.content.invalid || this.type.invalid) {
      this.content.markAsTouched();
      this.type.markAsTouched();
      return;
    }
    this.create.emit({ content: this.content.value.trim(), type: this.type.value });
  }

  onClose() {
    this.close.emit();
  }

  reset() {
    this.content.setValue('');
    this.content.markAsUntouched();
    this.type.setValue(ComponentType.Paragraph);
    this.type.markAsUntouched();
  }
}
