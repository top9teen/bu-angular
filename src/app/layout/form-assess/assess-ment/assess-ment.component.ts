import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { CriterionModel, InspectionModelModule, CriterionAssessmentRespModel } from '../../model/inspection-model/inspection-model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { debug } from 'util';
import * as Config from '../../../shared/config/constants';
@Component({
  selector: 'app-assess-ment',
  templateUrl: './assess-ment.component.html',
  styleUrls: ['./assess-ment.component.scss']
})
export class AssessMentComponent implements OnInit {

  inspectionName: String;
  criterionModel: CriterionModel;
  criterionAssessmentRespModel: CriterionAssessmentRespModel;
  pdfURL: String;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
    this.criterionAssessmentRespModel = this.inspectionModelModule._criterionAssessmentRespModel;
    this.pdfURL = Config.API_ASSESS_URL + 'print-report/' + this.criterionAssessmentRespModel.assessmentId;
 //   this.printPdf(this.criterionAssessmentRespModel.assessmentId);

  //  http; :  // localhost:8772/assess/print-report
  }
    // printPdf(assessMentId: String) {
    //  this.apiService.printPdf(assessMentId).subscribe(
    //   () => {
    //     this.pdfURL = this.inspectionModelModule._pdfURL;
    //   }, (err) => {

    //   });
    // }
  ngOnInit() {
  }

}
