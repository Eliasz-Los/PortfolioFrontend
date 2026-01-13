import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewStep } from './overview-step';

describe('OverviewStep', () => {
  let component: OverviewStep;
  let fixture: ComponentFixture<OverviewStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
