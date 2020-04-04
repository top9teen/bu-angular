import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EverydaylifeComponent } from './everydaylife.component';

describe('EverydaylifeComponent', () => {
  let component: EverydaylifeComponent;
  let fixture: ComponentFixture<EverydaylifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EverydaylifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EverydaylifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
