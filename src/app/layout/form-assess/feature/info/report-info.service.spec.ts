/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportInfoService } from './report-info.service';

describe('Service: ReportInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportInfoService]
    });
  });

  it('should ...', inject([ReportInfoService], (service: ReportInfoService) => {
    expect(service).toBeTruthy();
  }));
});
