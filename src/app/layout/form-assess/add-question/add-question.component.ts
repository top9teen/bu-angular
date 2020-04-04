import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModel, InspectionModelModule, QuestionModel, ChoiceModel } from '../../model/inspection-model/inspection-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionModel: QuestionModel;
  choices: Array<ChoiceModel> = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
    this.getQuestion();
  }

  coiceForm: FormGroup = this.fb.group({
    questionName: this.fb.control('', Validators.required),
    choiceCriterion_1: this.fb.control('', Validators.required),
    choiceName_1: this.fb.control('', Validators.required),
    choiceCriterion_2: this.fb.control('', Validators.required),
    choiceName_2: this.fb.control('', Validators.required),
    choiceCriterion_3: this.fb.control('', Validators.required),
    choiceName_3: this.fb.control('', Validators.required),
    choiceCriterion_4: this.fb.control('', Validators.required),
    choiceName_4: this.fb.control('', Validators.required),
    choiceCriterion_5: this.fb.control('', Validators.required),
    choiceName_5: this.fb.control('', Validators.required),

  });

  onSaveChoice() {
    const obj = this.coiceForm.value;
    const jsondata = {
      'choices': [
        {
          'choiceName': obj.choiceName_1,
          'choiceCriterion': obj.choiceCriterion_1
        },
        {
          'choiceName': obj.choiceName_2,
          'choiceCriterion': obj.choiceCriterion_2
        },
        {
          'choiceName': obj.choiceName_3,
          'choiceCriterion': obj.choiceCriterion_3
        },
        {
          'choiceName': obj.choiceName_4,
          'choiceCriterion': obj.choiceCriterion_4
        },
        {
          'choiceName': obj.choiceName_5,
          'choiceCriterion': obj.choiceCriterion_5
        },
      ],
      'questionName': obj.questionName,
      'questionId':this.inspectionModelModule._questionId,
      'inspectionId':this.inspectionModelModule._inspectionId
    }

    var result = this.apiService.saveQuestion(jsondata);
     this.inspectionModelModule._questionId = '';
     this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
     this.router.navigate(['/form-assess/manage-question']));

  } 

  getQuestion() {
    if (this.inspectionModelModule._questionId != '' && this.inspectionModelModule._questionId != null) {
      this.apiService.getQuestionById(this.inspectionModelModule._questionId).subscribe(
        () => {
          this.questionModel = this.inspectionModelModule._questionModel;
          this.choices = this.inspectionModelModule._questionModel.choices;
        }, (err) => {
          console.log('error -> ', err);
        });
    }else{
      this.questionModel = null;
      this.choices = null;
    }
  }

  onBack(){
   // this.inspectionModelModule._inspectionId = '';
    this.inspectionModelModule._questionId = '';
    this.router.navigate(['/form-assess/manage-question']);
  }


  ngOnInit() {
    this.getQuestion();
  }

}
