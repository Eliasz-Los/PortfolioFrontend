import {Injectable} from '@angular/core';
import {environment} from '../../../../env/environment';
import {HttpClient} from '@angular/common/http';
import {AddComponentDto} from '../../models/docugroup/doc-components/AddComponentDto';
import {ChangeContentComponentDto} from '../../models/docugroup/doc-components/ChangeContentComponentDto';
import {ReorderComponentDto} from '../../models/docugroup/doc-components/ReorderComponentDto';
import {ChangeTypeComponentDto} from '../../models/docugroup/doc-components/ChangeTypeComponentDto';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private apiUrl = `${environment.apiUrl}/docugroup/components`;

  constructor(private http: HttpClient) { }

  addComponentToDocument(component: AddComponentDto) {
    return this.http.post<AddComponentDto>(`${this.apiUrl}`, component);
  }

  changeContent(component: ChangeContentComponentDto){
    return this.http.put<ChangeContentComponentDto>(`${this.apiUrl}/content`, component);
  }

  reorderComponent(component: ReorderComponentDto){
    return this.http.put<ReorderComponentDto>(`${this.apiUrl}/reorder`, component);
  }

  changeType(component: ChangeTypeComponentDto){
    return this.http.put<ChangeTypeComponentDto>(`${this.apiUrl}/type`, component);
  }

  removeComponent(documentId: string,componentId: string){
    return this.http.delete(`${this.apiUrl}/${documentId}/${componentId}`);
  }

}
