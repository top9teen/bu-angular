import { Component, OnInit } from '@angular/core';
import { DataGoogleDetail } from 'src/app/layout/model/inspection-model/inspection-model';
import * as Config from '../../../../shared/config/constants';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import { ReportInfoService } from '../info/report-info.service';

@Component({
  selector: 'app-report-conclusion',
  templateUrl: './report-conclusion.component.html',
  styleUrls: ['./report-conclusion.component.scss']
})
export class ReportConclusionComponent implements OnInit {

  dataGoogleDetails: DataGoogleDetail[] = [];
  dataShow: DataShow[] = [];
  constructor(
     // tslint:disable-next-line: deprecation
     private http: HttpClient,
     public reportInfoService: ReportInfoService
  ) { }

 async ngOnInit() {
  }

  async  onLoadData() {
    this.dataShow = [];
    this.dataGoogleDetails = [];
    this.dataGoogleDetails = this.reportInfoService.getallDataInfo();
    if (this.dataGoogleDetails.length > 0) {
    this.http.post(Config.API_ASSESS_URL + 'get-report-conclusion',  this.dataGoogleDetails)
      .toPromise().then(async (data: DataShow[]) => {
        this.dataShow = data;
      });
    }
  }
}

export interface DataShow {
  community: String;
  inspectionId: DataMax[];
  member: number;
}

export interface DataMax {
  name: String;
  member: number;
}
