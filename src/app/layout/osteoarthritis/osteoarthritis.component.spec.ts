import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsteoarthritisComponent } from './osteoarthritis.component';

describe('OsteoarthritisComponent', () => {
  let component: OsteoarthritisComponent;
  let fixture: ComponentFixture<OsteoarthritisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsteoarthritisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsteoarthritisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
