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
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, finalize, forkJoin, map, Observable, switchMap, tap} from 'rxjs';
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
import {DraftComponent} from '../../../core/models/docugroup/draft/DraftComponent';
import {PublishDto} from '../../../core/models/docugroup/document/PublishDto';


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
  private docSubject = new BehaviorSubject<DraftDocument | null>(null);
  groupDocument$ = this.docSubject.asObservable();
  loading: boolean = true;
  saving: boolean = false;
  isAddModalOpen =false;
  //SSE
  private closeSSE?: () => void;

  constructor(private documentService: DocumentService,
              private componentService: ComponentService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService) {

  }

  ngOnInit(): void {
   this.route.paramMap.pipe(
      map(p => p.get('id')!),
      switchMap(id => {
        this.loading = true;
        //Connect SSE once we know the doc id
        this.startSSE(id);

        return this.documentService.getDraftDocumentById(id).pipe(
          tap(document => {
            console.log('DOC keys', Object.keys(document as any));
            console.log('Has components?', (document as any).components);
            this.docSubject.next(document);
          }),
          finalize(() => (this.loading = false))
        );
      })
    ).subscribe();
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
      onContent: payload => this.applyContentChange(payload),
       onType: payload => {
        console.log("SSE type change", payload);
        this.applyTypeChange(payload);
       },
       onReorder: payload => this.applyReorder(payload),
       onAdded: payload => this.applyAdd(payload),
      onRemoved: payload => this.applyRemove(payload)
    });
  }

  private refreshDraft(documentId: string) {
    this.documentService.getDraftDocumentById(documentId).subscribe({
      next: doc => {
        this.docSubject.next(doc)
      },
      error: () => {
        this.alertService.error('Failed to refresh document');
      }
    });
  }

  //Change content
  onChangeComponentContent(change: { id: string; content: string }): void {
    if (!this.docSubject.value) return;

    this.saving = true;

    const comp: ChangeContentComponentDto={
      id: change.id,
      lastPublishedContentJson: change.content,
      groupDocumentId: this.docSubject.value.id
    }

    this.componentService.changeContent(comp).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.info('Component content updated successfully');
      },
      error: () => {
        this.alertService.error('Failed to update component content');
      }
    });
  }

  //Patch handler for content changes from SSE (only updates the content of the affected component, not the whole doc)
  private applyContentChange(payload: any): void {
    const doc = this.docSubject.value;
    if (!doc) return;
    const {id, lastPublishedContentJson} = payload;
    const compId = doc.components.findIndex(c => c.id === id);
    if (compId < 0) return;

    const updatedComp = {
      ...doc,
      components: doc.components.map(c => c.id === id ? {...c, lastPublishedContentJson} : c)
    };
    this.docSubject.next(updatedComp);
  }

  //Change type
  onChangeComponentType(type: {id: string, newType: ComponentType}): void {
    if (!this.docSubject.value) return;

    this.saving = true;
    const comp: ChangeTypeComponentDto={
      id: type.id,
      groupDocumentId: this.docSubject.value.id,
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
        this.alertService.warning('Failed to update component type. Try again!');
      }
    });
  }

  //Patch handler for the Type changes from SSE
  private applyTypeChange(payload: any): void {
    const doc = this.docSubject.value;
    if (!doc) return;

    const { id, type } = payload;

    const updated = {
      ...doc,
      components: doc.components.map(c =>
        c.id === id ? { ...c, componentType: type } : c
      )
    };

    this.docSubject.next(updated);
  }

  //Reorder
  drop(event: CdkDragDrop<any>) {
    const doc = this.docSubject.value;
    if (!doc) return;

    const components = [...doc.components];
    moveItemInArray(components, event.previousIndex, event.currentIndex);

    // update UI immediately
    const updatedDoc = { ...doc, components };
    this.docSubject.next(updatedDoc);

    // persist
    this.saving = true;
    const calls = components.map((c, index) =>
      this.componentService.reorderComponent({
        groupDocumentId: doc.id,
        id: c.id,
        newOrder: index + 1
      })
    );

    // Better than manual counting:
    forkJoin(calls)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => this.alertService.info('Reordered.'),
        error: () => this.alertService.warning('Failed to reorder.')
      });
  }
  private applyReorder(payload: any) {
    const doc = this.docSubject.value;
    if (!doc) return;

    const id = payload.id;
    const newOrder = payload.newOrder;

    const updatedComponents = doc.components
      .map(c => c.id === id ? { ...c, order: newOrder } : c)
      .sort((a, b) => a.order - b.order);

    this.docSubject.next({ ...doc, components: updatedComponents });
  }

  // Add component
  openAddModal(): void {
    this.isAddModalOpen = true;
  }
  closeAddModal(): void {
    this.isAddModalOpen = false;
  }
  addComponent(e:{content:string; type:ComponentType}): void {
    if (!this.docSubject.value) return;
    const dto: AddComponentDto = {
      componentType: e.type,
      groupDocumentId: this.docSubject.value.id,
      lastPublishedContentJson: e.content
    }

    this.saving = true;
    this.componentService.addComponentToDocument(dto).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.info('Component added.');
        this.closeAddModal();
      },
      error: () => {
        this.alertService.error('Failed to add component.');
      }
    });
  }
  private applyAdd(payload: any) {
    const doc = this.docSubject.value;
    if (!doc) return;
    const  newComp : DraftComponent = payload;

    const updated = {
      ...doc,
      components: [...doc.components, newComp]
    };

    this.docSubject.next(updated);
  }
  //Delete component
  deleteComponent(id: { id: string }): void {
    if (!this.docSubject.value) return;
    const ok = window.confirm('Delete this component?');
    //TODO - replace with custom confirmation dialog
    if (!ok) return;

    this.saving = true;
    this.componentService.removeComponent(this.docSubject.value.id, id.id).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.info('Component deleted.');
      },
      error: () => {
        this.alertService.error('Failed to delete component.');
      }
    });
  }
  private applyRemove(payload: any) {
    const doc = this.docSubject.value;
    if (!doc) return;

    const id = payload.id ?? payload.componentId;
    if (!id) return;

    this.docSubject.next({
      ...doc,
      components: doc.components.filter(c => c.id !== id)
    });
  }


  //Publish document
  publishDocument(): void {
    if(!this.docSubject.value)
      return this.alertService.error('Failed to publish document, the document in this has no values like ID and OR Title');

    const dto: PublishDto = {
      id: this.docSubject.value.id,
      title: this.docSubject.value.title,
    }
    this.saving = true;
    this.documentService.publishDocument(dto).pipe(
      finalize(() => (this.saving = false))
    ).subscribe({
      next: () => {
        this.alertService.success('Document published.');
        //Optionally, we could refresh the draft to get the new published content, but it should be the same
        //this.refreshDraft(dto.documentId);
      },
      error: () => {
        this.alertService.error('Failed to publish document. Try again!');
      }
    });
  }


  //Navigate back to the list
  navigateBack(): void {
    this.router.navigate(['docugroup']);
  }
}
