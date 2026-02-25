import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/environment';
import {Observable} from 'rxjs';
import {PublishDto} from '../../models/docugroup/document/PublishDto';
import {AddDocumentDto} from '../../models/docugroup/document/AddDocumentDto';
import {DocumentDto} from '../../models/docugroup/document/DocumentDto';
import {GroupDocument} from '../../models/docugroup/document/GroupDocument';
import {DocumentDetailsDto} from '../../models/docugroup/document/DocumentDetailsDto';
import {DraftDocument} from '../../models/docugroup/draft/DraftDocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/docugroup/documents`;

  constructor(private http: HttpClient) {}

   getDocumentById(id: string){
    return this.http.get<DocumentDetailsDto>(`${this.apiUrl}/${id}`);
  }

  getDraftDocumentById(documentId: string): Observable<DraftDocument>{
    return this.http.get<DraftDocument>(`${this.apiUrl}/${documentId}/draft`);
  }

  // Fetches all documents because the backend filters them based on the authenticated user who makes the call
  getUserDocuments(): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(`${this.apiUrl}/`);
  }

   addDocument(addDocumentDto: AddDocumentDto) {
    return this.http.post<AddDocumentDto>(`${this.apiUrl}/`, addDocumentDto);
  }

  deleteDocument(documentId: string) {
    return this.http.delete<void>(`${this.apiUrl}/${documentId}`);
  }

  publishDocument(publishDto: PublishDto) {
    return this.http.post<PublishDto>(`${this.apiUrl}/publish`, publishDto);
  }

}
