import { Component } from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, finalize, switchMap} from 'rxjs';

import {DocumentService} from '../../core/services/docugroup/document.service';
import {DocumentDto} from '../../core/models/docugroup/document/DocumentDto';
import {AlertService} from '../../core/services/alert.service';
import {AddDocumentDto} from '../../core/models/docugroup/document/AddDocumentDto';
import {Router} from '@angular/router';
import {LoadingComponent} from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-docugroup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './docugroup.html',
  styleUrl: './docugroup.css'
})
export class Docugroup {
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  documents$: Observable<DocumentDto[]> = this.refresh$.pipe(
    switchMap(() => this.documentService.getUserDocuments())
  );

  isSaving = false;
  isDeleting = false;

  titleControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)]
  });

  constructor(
    private readonly documentService: DocumentService,
    private readonly alerts: AlertService,
    private router: Router
  ) {}

  refresh(): void {
    this.refresh$.next();
  }

  addDocument(): void {
    if (this.titleControl.invalid) {
      this.titleControl.markAsTouched();
      return;
    }

    const title = this.titleControl.value.trim();
    if (!title) return;
    const dto: AddDocumentDto = { title };

    this.isSaving = true;
    this.documentService
      .addDocument(dto)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.alerts.success('Document created.');
          this.titleControl.setValue('');
          this.titleControl.markAsUntouched();
          this.refresh();
        },
        error: () => this.alerts.error('Failed to create document.')
      });
  }

  deleteDocument(id: string): void {
    if (!id) return;
    const ok = window.confirm('Delete this document?');
    //TODO - replace with custom confirmation dialog
    if (!ok) return;

    this.isDeleting = true;
    this.documentService
      .deleteDocument(id)
      .pipe(finalize(() => (this.isDeleting = false)))
      .subscribe({
        next: () => {
          this.alerts.success('Document deleted.');
          this.refresh();
        },
        error: () => this.alerts.error('Failed to delete document.')
      });
  }

  viewDocument(id: string): void {
    this.router.navigate(['docugroup', id]);
  }

  shareDocument(id: string) {
   console.log('Share document', id);
   //TODO - implement sharing functionality
   this.alerts.info('Sharing functionality not implemented yet.');
  }

  exportDocumentAsPdf(id: string) {
    console.log('Export document as PDF', id);
    //TODO - implement export functionality
    this.alerts.info('Export functionality not implemented yet.');
  }

  protected readonly formatDate = formatDate;
}
