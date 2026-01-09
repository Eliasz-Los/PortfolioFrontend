import {Injectable} from '@angular/core';
import {environment} from '../../../../env/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getInvoicePdf(invoiceId: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/hospital/invoices/${invoiceId}/pdf`, { responseType: 'blob' as 'json' });
  }



}
