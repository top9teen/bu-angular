import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElderlyComponent } from './add-elderly.component';

describe('AddElderlyComponent', () => {
  let component: AddElderlyComponent;
  let fixture: ComponentFixture<AddElderlyComponent>;
   
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddElderlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElderlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
