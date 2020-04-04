import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModel, InspectionModelModule ,QuestionModel} from '../../model/inspection-model/inspection-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.scss']
})
export class ManageQuestionComponent implements OnInit {
  inspectionModel: InspectionModel;
  questions : Array<QuestionModel> = [];
  inspectionName : String;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
    this.getQuestion();
  }

  getQuestion() {
    if (this.inspectionModelModule._inspectionId != '' && this.inspectionModelModule._inspectionId != null) {
      this.apiService.getInspectionById(this.inspectionModelModule._inspectionId).subscribe(
        () => {
          this.inspectionModel = this.inspectionModelModule._inspectionModel;
          this.questions = this.inspectionModel.questions;
          this.inspectionName = this.inspectionModel.inspectionName;
        }, (err) => {
          console.log('error -> ', err);
        });
    }
  }
  onUpdateQuestion(questionId?: String) {
    this.inspectionModelModule._questionId = questionId;
    this.router.navigate(['/form-assess/add-question']);
  }
  onDeleteQuestion(questionId?: String) {
    this.apiService.deleteQuestion(questionId);
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/form-assess/manage-question']));
  }

  onBack(){
    this.inspectionModelModule._inspectionId = '';
    this.inspectionModelModule._questionId = '';
    this.router.navigate(['/form-assess/manage-inspection']);
  }
  ngOnInit() {
    this.getQuestion();
  }

}
