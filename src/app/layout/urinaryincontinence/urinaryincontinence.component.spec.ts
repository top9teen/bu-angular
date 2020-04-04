import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrinaryincontinenceComponent } from './urinaryincontinence.component';

describe('UrinaryincontinenceComponent', () => {
  let component: UrinaryincontinenceComponent;
  let fixture: ComponentFixture<UrinaryincontinenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrinaryincontinenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrinaryincontinenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
