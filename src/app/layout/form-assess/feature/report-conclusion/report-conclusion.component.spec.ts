import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConclusionComponent } from './report-conclusion.component';

describe('ReportConclusionComponent', () => {
  let component: ReportConclusionComponent;
  let fixture: ComponentFixture<ReportConclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
