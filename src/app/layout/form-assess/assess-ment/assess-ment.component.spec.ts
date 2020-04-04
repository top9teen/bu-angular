import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessMentComponent } from './assess-ment.component';

describe('AssessMentComponent', () => {
  let component: AssessMentComponent;
  let fixture: ComponentFixture<AssessMentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessMentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessMentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
