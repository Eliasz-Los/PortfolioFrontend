import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = `${environment.apiUrl}/docugroup/documents`;

  connectToDocEvents(
    docId: string,
    token: string,
    handlers: {
      onContent?: (payload: any) => void;
      onType?: (payload: any) => void;
      onReorder?: (payload: any) => void;
      onAdded?: (payload: any) => void;
      onRemoved?: (payload: any) => void;
      onError?: (err: any) => void;
    } = {}
  ) {
    const url = `${this.apiUrl}/${docId}/events?access_token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    es.addEventListener('ChangeComponentContent', (e: MessageEvent) => {
      const evt = JSON.parse(e.data);
      handlers.onContent?.(evt.payload ?? evt);
    });

    es.addEventListener('ChangeComponentType', (e: MessageEvent) => {
      const evt = JSON.parse(e.data);
      handlers.onType?.(evt.payload ?? evt);
    });

    es.addEventListener('ReorderComponent', (e: MessageEvent) => {
      const evt = JSON.parse(e.data);
      handlers.onReorder?.(evt.payload ?? evt);
    });

    es.addEventListener('ComponentAdded', (e: MessageEvent) => {
      const evt = JSON.parse(e.data);
      handlers.onAdded?.(evt.payload ?? evt);
    });

    es.addEventListener('RemoveComponent', (e: MessageEvent) => {
      const evt = JSON.parse(e.data);
      handlers.onRemoved?.(evt.payload ?? evt);
    });

    es.onerror = (err) => {
      console.log('SSE error / reconnecting…', err);
      handlers.onError?.(err);
      // EventSource auto-reconnects
    };

    return () => es.close();
  }
}
