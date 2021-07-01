import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextalMenuComponent } from './contextal-menu.component';

describe('ContextalMenuComponent', () => {
  let component: ContextalMenuComponent;
  let fixture: ComponentFixture<ContextalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
