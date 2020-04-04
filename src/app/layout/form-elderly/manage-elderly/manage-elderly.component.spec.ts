import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElderlyComponent } from './manage-elderly.component';

describe('ManageElderlyComponent', () => {
  let component: ManageElderlyComponent;
  let fixture: ComponentFixture<ManageElderlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageElderlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageElderlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
