import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSchedulerComponent } from './default-scheduler.component';

describe('DefaultSchedulerComponent', () => {
  let component: DefaultSchedulerComponent;
  let fixture: ComponentFixture<DefaultSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
