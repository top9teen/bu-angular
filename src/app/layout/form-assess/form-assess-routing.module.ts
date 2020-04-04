import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageInspectionComponent } from './manage-inspection/manage-inspection.component';
import { AddInspectionComponent } from './add-inspection/add-inspection.component';
import {ManageQuestionComponent } from './manage-question/manage-question.component';
import {AddQuestionComponent } from './add-question/add-question.component';
import {AssessDiseaseComponent} from './assess-disease/assess-disease.component';
import {AddEvaluationComponent} from './add-evaluation/add-evaluation.component'
import { AssessMentComponent } from './assess-ment/assess-ment.component';
import {ReportComponent} from './report/report.component';
import {ReportAllComponent} from './report-all/report-all.component';

const routes: Routes = [
  {path : 'add-inspection' , component : AddInspectionComponent},
  {path : 'manage-inspection' , component : ManageInspectionComponent},
  {path : 'manage-question',component : ManageQuestionComponent},
  {path : 'add-question',component : AddQuestionComponent},
  {path : 'assess-disease' , component : AssessDiseaseComponent},
  {path : 'assess-ment' , component : AssessMentComponent},
  {path : 'add-evaluation' , component : AddEvaluationComponent},
  {path : 'report' , component : ReportComponent},
  {path : 'report-all' , component : ReportAllComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormAssessRoutingModule { }
