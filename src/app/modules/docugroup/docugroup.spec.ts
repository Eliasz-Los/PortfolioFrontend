import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Docugroup } from './docugroup';

describe('Docugroup', () => {
  let component: Docugroup;
  let fixture: ComponentFixture<Docugroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Docugroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Docugroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
