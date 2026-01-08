import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInvoices } from './patient-invoices';

describe('PatientInvoices', () => {
  let component: PatientInvoices;
  let fixture: ComponentFixture<PatientInvoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientInvoices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInvoices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
