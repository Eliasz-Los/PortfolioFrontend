import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStep } from './doctor-step';

describe('DoctorStep', () => {
  let component: DoctorStep;
  let fixture: ComponentFixture<DoctorStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
