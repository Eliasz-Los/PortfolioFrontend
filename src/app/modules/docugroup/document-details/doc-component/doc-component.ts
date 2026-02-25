import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DraftComponent} from '../../../../core/models/docugroup/draft/DraftComponent';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {ComponentService} from '../../../../core/services/docugroup/component.service';
import {AlertService} from '../../../../core/services/alert.service';
import {ComponentType} from '../../../../core/models/docugroup/doc-components/ComponentType';

@Component({
  selector: 'app-doc-component',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    CdkDrag
  ],
  templateUrl: './doc-component.html',
  styleUrl: './doc-component.css'
})
export class DocComponent implements OnChanges {
  @Input() draftComponent!: DraftComponent;
  editing: boolean = false;
  editContent: string = '';
  selectedType!: ComponentType;
  readonly ComponentType = ComponentType;

  @Output() saveContent = new EventEmitter<{ id: string; content: string }>();
  @Output() changeType = new EventEmitter<{ id: string; newType: ComponentType }>();
  @Output() delete = new EventEmitter<{id:string}>();

  constructor(private componentService: ComponentService,
              private alertService: AlertService) {
  }

  ngOnChanges() {
    //Whenever the input / type changes we refresh the card so that the users sees the changes
    if(this.draftComponent){
      this.selectedType = this.draftComponent.componentType as ComponentType;
    }
  }

  startEditing(): void {
    this.editing = true;
    this.editContent = this.draftComponent.lastPublishedContentJson ?? '';
    this.selectedType = this.draftComponent.componentType as unknown as ComponentType;
  }

  cancelEditing(): void {
    this.editing = false;
  }

  saveContentComp(): void {
    this.saveContent.emit({
      id: this.draftComponent.id,
      content: this.editContent
    });
    this.editing = false;
  }

  changeTypeComp(newType: ComponentType): void {
    this.changeType.emit({
      id: this.draftComponent.id,
      newType
    });
  }

  get typeClass(): string {
    return `type-${this.draftComponent.componentType?.toString().toLowerCase()}`;
  }

  deleteComp() {
    this.delete.emit({id: this.draftComponent.id});
  }
}
