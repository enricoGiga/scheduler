import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheduler5Component } from './scheduler5.component';

describe('Scheduler5Component', () => {
  let component: Scheduler5Component;
  let fixture: ComponentFixture<Scheduler5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scheduler5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheduler5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
