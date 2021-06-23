import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheduler3Component } from './scheduler3.component';

describe('Scheduler3Component', () => {
  let component: Scheduler3Component;
  let fixture: ComponentFixture<Scheduler3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scheduler3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheduler3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
