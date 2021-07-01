import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheduler1Component } from './scheduler6.component';

describe('Scheduler1Component', () => {
  let component: Scheduler1Component;
  let fixture: ComponentFixture<Scheduler1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scheduler1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheduler1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
