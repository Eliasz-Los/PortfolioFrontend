import {Component, Input} from '@angular/core';
import {InvoiceDto} from '../../../../core/models/hospital/InvoiceDto';
import {PatientService} from '../../../../core/services/hospital/patient.service';
import {InvoiceService} from '../../../../core/services/hospital/invoice.service';
import {AlertService} from '../../../../core/services/alert.service';

@Component({
  selector: 'app-patient-invoices',
  standalone: true,
  imports: [],
  templateUrl: './patient-invoices.html',
  styleUrl: './patient-invoices.css'
})
export class PatientInvoices {
  @Input() patientId: string = '';
  invoices: InvoiceDto[] = [];

  constructor(private patientService : PatientService,
              private invoiceService : InvoiceService,
              private alertService: AlertService) {}

  ngOnInit(): void {
    if (!this.patientId) return;

    this.patientService.getInvoicesForPatient(this.patientId).subscribe({
      next: (invoices) => {
        this.invoices = invoices;
      },
      error: () => {
        this.alertService.error('Error fetching invoices');
      }
    })
  }

  openInvoice(invoiceId: string) {
    this.invoiceService.getInvoicePdf(invoiceId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: () => {
        this.alertService.error('Error with visualising PDF for this particular invoice', );

      }
    })
  }
}
