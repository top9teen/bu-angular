import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessDiseaseComponent } from './assess-disease.component';

describe('AssessDiseaseComponent', () => {
  let component: AssessDiseaseComponent;
  let fixture: ComponentFixture<AssessDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessDiseaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
