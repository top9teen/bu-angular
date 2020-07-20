import { Injectable } from '@angular/core';
import { AssessModel, DataGoogleDetail } from 'src/app/layout/model/inspection-model/inspection-model';
@Injectable()
export class ReportInfoService {

  private reportData: AssessModel[] = [];
  private reportAllData: DataGoogleDetail[] = [];

constructor(
) { }

  getDataInfo() {
    if (this.reportData == null) {
      this.reportData = [];
    }
    return this.reportData;
  }

  setDataInfo(reportData: AssessModel[]) {
    this.reportData = reportData;
  }

  getallDataInfo() {
    if (this.reportAllData == null) {
      this.reportAllData = [];
    }
    return this.reportAllData;
  }

  setallDataInfo(reportAllData: DataGoogleDetail[]) {
    this.reportAllData = reportAllData;
  }
}
