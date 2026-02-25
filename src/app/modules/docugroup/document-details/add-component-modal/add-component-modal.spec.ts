import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponentModal } from './add-component-modal';

describe('AddComponentModal', () => {
  let component: AddComponentModal;
  let fixture: ComponentFixture<AddComponentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComponentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComponentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
