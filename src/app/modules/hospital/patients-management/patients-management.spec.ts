import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsManagement } from './patients-management';

describe('PatientsManagement', () => {
  let component: PatientsManagement;
  let fixture: ComponentFixture<PatientsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
