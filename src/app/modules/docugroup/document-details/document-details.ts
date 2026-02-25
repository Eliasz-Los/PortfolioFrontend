import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef, OnDestroy, OnInit,
  QueryList,
  signal,
  ViewChildren
} from '@angular/core';
import {DocumentService} from '../../../core/services/docugroup/document.service';
import {ComponentService} from '../../../core/services/docugroup/component.service';
import {AlertService} from '../../../core/services/alert.service';
import {ActivatedRoute} from '@angular/router';
import {finalize, Observable, switchMap, tap} from 'rxjs';
import {DraftDocument} from '../../../core/models/docugroup/draft/DraftDocument';
import {AsyncPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';
import {DocComponent} from './doc-component/doc-component';
import {CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChangeContentComponentDto} from '../../../core/models/docugroup/doc-components/ChangeContentComponentDto';
import {ChangeTypeComponentDto} from '../../../core/models/docugroup/doc-components/ChangeTypeComponentDto';
import {ComponentType} from '../../../core/models/docugroup/doc-components/ComponentType';
import {AddComponentDto} from '../../../core/models/docugroup/doc-components/AddComponentDto';
import {AddComponentModal} from './add-component-modal/add-component-modal';
import {EventService} from '../../../core/services/docugroup/event.service';
import {keycloakAuth} from '../../../core/services/auth/KeycloakAuthService';


@Component({
  selector: 'app-document-details',
  imports: [
    AsyncPipe,
    LoadingComponent,
    DocComponent,
    CdkDropList,
    AddComponentModal
  ],
  templateUrl: './document-details.html',
  styleUrl: './document-details.css'
})
export class DocumentDetails implements OnInit, OnDestroy{
  groupDocument$: Observable<DraftDocument> = new Observable<DraftDocument>();
  loading: boolean = true;
  saving: boolean = false;
  currentDoc: DraftDocument | null = null;//purely for the reorder UI
  isAddModalOpen =false;
  //SSE
  private closeSSE?: () => void;

  constructor(private documentService: DocumentService,
              private componentService: ComponentService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private eventService: EventService) {

  }

  ngOnInit(): void {
    this.groupDocument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        this.loading = true;

        //Connect SSE once we know the doc id
        this.startSSE(id);

        return this.documentService.getDraftDocumentById(id).pipe(
          tap(document => {this.currentDoc = document}),
          finalize(() => (this.loading = false))
        );
      })
    );
  }

  ngOnDestroy() {
    this.closeSSE?.();
  }

  private async startSSE(documentId: string) {
    //close the old stream first if route changes to another doc
    this.closeSSE?.();

    const token = await keycloakAuth.getAccessToken();
    if(!token) return; //not logged in

    this.closeSSE = this.eventService.connectToDocEvents(documentId, token, {
      //We refethc full draft on any event
      onContent: () => this.refreshDraft(documentId),
       onType: () => this.refreshDraft(documentId),
       onReorder: () => this.refreshDraft(documentId),
       onAdded: () => this.refreshDraft(documentId),
      onRemoved: () => this.refreshDraft(documentId)
    });
  }

  private refreshDraft(documentId: string) {
    this.documentService.getDraftDocumentById(documentId).subscribe({
      next: doc => {
        this.currentDoc = doc;
      },
      error: () => {
        this.alertService.error('Failed to refresh document');
      }
    });
  }

  //Change content
  onSaveComponentContent(change: { id: string; content: string }): void {
    if (!this.currentDoc) return;

    this.saving = true;

    const comp: ChangeContentComponentDto={
      id: change.id,
      lastPublishedContentJson: change.content,
      groupDocumentId: this.currentDoc.id
    }

    this.componentService.changeContent(comp).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.success('Component content updated successfully');
      },
      error: () => {
        this.alertService.error('Failed to update component content');
      }
    });
  }

  //Change type
  onChangeComponentType(type: {id: string, newType: ComponentType}): void {
    if (!this.currentDoc) return;

    this.saving = true;
    const comp: ChangeTypeComponentDto={
      id: type.id,
      groupDocumentId: this.currentDoc.id,
      type: type.newType,
      clearLastPublishedContent: true
    }

    this.componentService.changeType(comp).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.success('Component type updated successfully');
      },
      error: () => {
        this.alertService.error('Failed to update component type');
      }
    });
  }

  //Reorder
  drop(event: CdkDragDrop<any>) {
    if (!this.currentDoc) return;

    moveItemInArray(this.currentDoc.components, event.previousIndex, event.currentIndex);

    // persist new orders (1..n) using your backend reorder endpoint
    this.saving = true;
    const calls = this.currentDoc.components.map((c, index) =>
      this.componentService.reorderComponent({
        groupDocumentId: this.currentDoc!.id,
        id: c.id,
        newOrder: index + 1
      })
    );

    // simplest: fire sequentially by subscribing each (works). Better: forkJoin (also works).
    // If you already use RxJS forkJoin:
    // forkJoin(calls).pipe(finalize(() => this.saving = false)).subscribe(...)

    let done = 0;
    calls.forEach(req =>
      req.subscribe({
        next: () => {
          done++;
          if (done === calls.length) {
            this.saving = false;
            this.alertService.success('Reordered.');
          }
        },
        error: () => {
          this.saving = false;
          this.alertService.error('Failed to reorder.');
        }
      })
    );
  }

  // Add component
  openAddModal(): void {
    this.isAddModalOpen = true;
  }
  closeAddModal(): void {
    this.isAddModalOpen = false;
  }
  addComponent(e:{content:string; type:ComponentType}): void {
    if (!this.currentDoc) return;
    const dto: AddComponentDto = {
      componentType: e.type,
      groupDocumentId: this.currentDoc.id,
      lastPublishedContentJson: e.content
    }

    this.saving = true;
    this.componentService.addComponentToDocument(dto).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.success('Component added.');
        this.closeAddModal();
      },
      error: () => {
        this.alertService.error('Failed to add component.');
      }
    });
  }

  //Delete component
  deleteComponent(id: { id: string }): void {
    if (!this.currentDoc) return;
    const ok = window.confirm('Delete this component?');
    //TODO - replace with custom confirmation dialog
    if (!ok) return;

    this.saving = true;
    this.componentService.removeComponent(this.currentDoc.id, id.id).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.success('Component deleted.');
      },
      error: () => {
        this.alertService.error('Failed to delete component.');
      }
    });
  }


  protected readonly AddComponentModal = AddComponentModal;
}
