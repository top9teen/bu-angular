import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportInfoService } from '../info/report-info.service';
import { Subject } from 'rxjs';
import { DataGoogleDetail } from 'src/app/layout/model/inspection-model/inspection-model';
import * as Config from '../../../../shared/config/constants';
@Component({
  selector: 'app-reportall-feature',
  templateUrl: './reportall-feature.component.html',
  styleUrls: ['./reportall-feature.component.scss']
})
export class ReportallFeatureComponent implements OnInit {

  flagShow: boolean;
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  pdfURL = Config.API_ASSESS_URL + 'print-report/';
  dataGoogleDetails: DataGoogleDetail[] = [];
  constructor(
    public reportInfoService: ReportInfoService
  ) { }

  async ngOnInit() {
    this.flagShow = true;
    await this.Options();
    this.dataGoogleDetails = [];
    await this.onLoadData();
  }

  async Options() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }


async  onLoadData() {
  this.dataGoogleDetails = [];
  this.dataGoogleDetails = this.reportInfoService.getallDataInfo();
  setTimeout(() => {
    this.dtTrigger.next();
  }, 500);
 await $('#example').DataTable().destroy();
  }

  async disflag() {
    this.flagShow = false;
  }
}
