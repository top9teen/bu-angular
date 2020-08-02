import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportallFeatureComponent } from '../feature/reportall-feature/reportall-feature.component';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspectionModelModule, DataGoogleMapRespModel, DataGoogleDetail, InspectionModel } from '../../model/inspection-model/inspection-model';
import { Router } from '@angular/router';
import { ReportInfoService } from '../feature/info/report-info.service';
import { Http, Response } from '@angular/http';
import * as Config from '../../../shared/config/constants';
import { routerTransition } from 'src/app/router.animations';
@Component({
  selector: 'app-report-all-user',
  templateUrl: './report-all-user.component.html',
  styleUrls: ['./report-all-user.component.scss',],
  animations: [routerTransition()]

})
export class ReportAllUserComponent implements OnInit {


  @ViewChild(ReportallFeatureComponent) reportAllFeatureComponent: ReportallFeatureComponent;
  constructor(
    private apiService: ApiServiceModule,
    private fb: FormBuilder,
    private inspectionModelModule: InspectionModelModule,
    public router: Router,
    public reportInfoService: ReportInfoService,
    // tslint:disable-next-line: deprecation
    private http: Http) {
      this.onLoadData();
  }

  name = "ประวัติผลการประเมินรายบุคลลย้อนหลัง";
  dataGoogleMapRespModel: DataGoogleMapRespModel;
  dataGoogleDetails: DataGoogleDetail[] = [];
  inspectionModels?: Array<InspectionModel> = [];
  inspectionId?: String;
  dateStart?: String;
  dateEnd?: String;
  community?: String;
  lavel?: String;
  fname?: string;

  inspectionForm: FormGroup = this.fb.group({
    inspectionId: this.fb.control('', Validators.required),
    dateStart: this.fb.control('', Validators.required),
    dateEnd: this.fb.control('', Validators.required),
    community: this.fb.control('', Validators.required),
    lavel: this.fb.control('', Validators.required),
    fname: this.fb.control('', Validators.required)
  });

  async loadData() {
    this.dataGoogleDetails = [];
    this.reportInfoService.setallDataInfo(null);
    await this.http.post(Config.API_ASSESS_URL + 'get-datamapUser', this.inspectionForm.value)
      .subscribe(async persons => {
        this.dataGoogleMapRespModel = this.extractData(persons);
        this.dataGoogleDetails = this.dataGoogleMapRespModel.dataGoogleDetails;
        if (this.dataGoogleDetails.length > 0) {
          this.reportInfoService.setallDataInfo(this.dataGoogleDetails);
          await this.reportAllFeatureComponent.ngOnInit();
        } else {
          await this.reportAllFeatureComponent.ngOnInit();
        }
      }, (err) => {
        console.log('error -> ', err);
      });
  }
  // tslint:disable-next-line: deprecation
  extractData(res: Response) {
    const body = res.json();
    // console.log('error -> ', res);
    return body.data || {};
  }

  ngOnInit() {
    this.reportInfoService.setallDataInfo(null);
  }

  onLoadData() {
    this.apiService.getListInspection().subscribe(
      () => {
        this.inspectionModels = this.inspectionModelModule._inspectionModels;
      }, (err) => {
        console.log('error -> ', err);
      });
  }
}
