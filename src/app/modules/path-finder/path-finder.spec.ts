import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFinder } from './path-finder';

describe('PathFinder', () => {
  let component: PathFinder;
  let fixture: ComponentFixture<PathFinder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathFinder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathFinder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
