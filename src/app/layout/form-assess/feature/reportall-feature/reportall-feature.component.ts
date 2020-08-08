import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ReportInfoService } from '../info/report-info.service';
import { Subject } from 'rxjs';
import { DataGoogleDetail } from 'src/app/layout/model/inspection-model/inspection-model';
import * as Config from '../../../../shared/config/constants';
import { HttpClient } from '@angular/common/http';
import { UserService, UserModel } from 'src/app/shared/guard/user.service';
@Component({
  selector: 'app-reportall-feature',
  templateUrl: './reportall-feature.component.html',
  styleUrls: ['./reportall-feature.component.scss']
})
export class ReportallFeatureComponent implements OnInit {

  @Input() name: string;

  flagShow: boolean;
  isSaving: boolean;

  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  pdfURL = Config.API_ASSESS_URL + 'print-report/';
  dataGoogleDetails: DataGoogleDetail[] = [];

  public userModeil: UserModel;
  constructor(
    public reportInfoService: ReportInfoService,
    private http: HttpClient,
    userservice: UserService
  ) {
    this.userModeil = userservice._userModel;
   }

  async ngOnInit() {
    this.isSaving = false;
    this.flagShow = true;
    await this.Options();
    this.dataGoogleDetails = [];
    await this.onLoadData();
  }

  async Options() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { targets: 3, type: 'date' }

      ]
    };
  }


async  onLoadData() {
  this.dataGoogleDetails = [];
  this.dataGoogleDetails = this.sortdata(this.reportInfoService.getallDataInfo());
  setTimeout(() => {
    this.dtTrigger.next();
  }, 500);
      await $('#example').DataTable().destroy();
  }

  sortdata(data) {
    if (data.length > 1) {
      data.sort(
        function (a, b) {
          return Number(a.strdate < b.strdate);
        }
      );
    }
    return data;
  }
  async disflag() {
    this.flagShow = false;
  }

  async goToExportExcelFinishedTask() {
    this.isSaving = true;
    await this.http.post(Config.API_ASSESS_URL + 'completeReport/GenexportData/' + this.userModeil.userId,  this.dataGoogleDetails).toPromise().then(async (data: string) => {
      if (data === 'S') {
        window.open(Config.API_ASSESS_URL + 'completeReport/exportExcel/' + this.userModeil.userId + '/' + this.name);
      }
    }, err => {
      window.open(Config.API_ASSESS_URL + 'completeReport/exportExcel/' + this.userModeil.userId + '/' + this.name);
    });
    this.isSaving = false;
  }

  async goToExportPDFFinishedTask() {
    this.isSaving = true;
    await this.http.post(Config.API_ASSESS_URL + 'completeReport/GenexportData/' + this.userModeil.userId,  this.dataGoogleDetails).toPromise().then(async (data: string) => {
      if (data === 'S') {
        window.open(Config.API_ASSESS_URL + 'completeReport/exportPDF/' + this.userModeil.userId + '/' + this.name);
      }
    }, err => {
      window.open(Config.API_ASSESS_URL + 'completeReport/exportPDF/' + this.userModeil.userId + '/' + this.name);
    });
    this.isSaving = false;
  }

}
