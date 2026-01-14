import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStep } from './patient-step';

describe('PatientStep', () => {
  let component: PatientStep;
  let fixture: ComponentFixture<PatientStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
