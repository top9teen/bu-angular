import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormAssessRoutingModule } from './form-assess-routing.module';
import { ManageInspectionComponent } from './manage-inspection/manage-inspection.component';

import { FormSharedModule } from '../form-shared/form-shared.module';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared';
import { AddInspectionComponent } from './add-inspection/add-inspection.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AssessDiseaseComponent } from './assess-disease/assess-disease.component';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import { AssessMentComponent } from './assess-ment/assess-ment.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ReportAllComponent } from './report-all/report-all.component';
import { AgmCoreModule } from '@agm/core';
import { ReportInfoService } from './feature/info/report-info.service';
import { DataTablesModule } from 'angular-datatables';
import { ReportFeatureComponent } from './feature/report-feature/report-feature.component';
import { ReportallFeatureComponent } from './feature/reportall-feature/reportall-feature.component';
import { ReportConclusionComponent } from './feature/report-conclusion/report-conclusion.component';
@NgModule({
  imports: [CommonModule,
    FormAssessRoutingModule,
    PageHeaderModule,
    DataTablesModule,
     SharedModule,
      FormSharedModule,
      Ng2Charts,
      AgmCoreModule.forRoot({
       apiKey: 'AIzaSyA7X9xHkQYWB9cD2XK088A_VT_CE4vCsQM'
  }),
],
  declarations: [ManageInspectionComponent,
    AddInspectionComponent,
    ManageQuestionComponent,
    AddQuestionComponent,
    AssessDiseaseComponent,
    AddEvaluationComponent,
    AssessMentComponent,
    ReportComponent,
    ReportAllComponent,
    ReportFeatureComponent,
    ReportallFeatureComponent,
    ReportConclusionComponent,
  ],
  providers: [
    //service
    ReportInfoService,
  ],
  bootstrap: []
})
export class FormAssessModule { }
