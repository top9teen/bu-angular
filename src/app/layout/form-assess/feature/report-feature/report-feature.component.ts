import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AssessModel } from 'src/app/layout/model/inspection-model/inspection-model';
import { ReportInfoService } from '../info/report-info.service';

import * as Config from '../../../../shared/config/constants';
@Component({
  selector: 'app-report-feature',
  templateUrl: './report-feature.component.html',
  styleUrls: ['./report-feature.component.scss']
})
export class ReportFeatureComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  datacheck: number;
  assessModels: AssessModel[] = [];
  pdfURL = Config.API_ASSESS_URL + 'print-report/';
  constructor(
    public reportInfoService: ReportInfoService
    ) { }

 async ngOnInit() {
  await this.Options();
  this.assessModels = [];
  await this.onLoadData();


  }

  async Options() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }


async  onLoadData() {
  this.assessModels = [];
  this.assessModels = this.reportInfoService.getDataInfo();
  setTimeout(() => {
    this.dtTrigger.next();
  }, 200);
  $('#example').DataTable().destroy();
  }
}
