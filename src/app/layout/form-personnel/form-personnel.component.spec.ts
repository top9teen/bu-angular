import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersonnelComponent } from './form-personnel.component';

describe('FormPersonnelComponent', () => {
  let component: FormPersonnelComponent;
  let fixture: ComponentFixture<FormPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
