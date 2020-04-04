import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElderlyComponent } from './form-elderly.component';

describe('FormElderlyComponent', () => {
  let component: FormElderlyComponent;
  let fixture: ComponentFixture<FormElderlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormElderlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElderlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
