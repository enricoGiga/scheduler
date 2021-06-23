import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheduler4Component } from './scheduler4.component';

describe('Scheduler4Component', () => {
  let component: Scheduler4Component;
  let fixture: ComponentFixture<Scheduler4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scheduler4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheduler4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
