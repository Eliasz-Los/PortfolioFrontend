import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPickerComponent } from './entity-picker.component';

describe('EntityPicker', () => {
  let component: EntityPickerComponent;
  let fixture: ComponentFixture<EntityPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
