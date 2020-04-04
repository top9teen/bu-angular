import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { CriterionRespModel, CriterionModel, InspectionModelModule, QuestionModel, ChoiceModel } from '../../model/inspection-model/inspection-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {
  criterionModel: CriterionRespModel;
  criterions: Array<CriterionModel> = [];
  inspectionName: String;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
      this.getCriterion();
  }

  criterionForm: FormGroup = this.fb.group({
    inspectionName: this.fb.control('', Validators.required),
    criterionStart_1: this.fb.control('', Validators.required),
    criterionEnd_1: this.fb.control('', Validators.required),
    criterionDetail_1: this.fb.control('', Validators.required),
    criterionColor_1: this.fb.control('', Validators.required),
    criterionStart_2: this.fb.control('', Validators.required),
    criterionEnd_2: this.fb.control('', Validators.required),
    criterionDetail_2: this.fb.control('', Validators.required),
    criterionColor_2: this.fb.control('', Validators.required),
    criterionStart_3: this.fb.control('', Validators.required),
    criterionEnd_3: this.fb.control('', Validators.required),
    criterionDetail_3: this.fb.control('', Validators.required),
    criterionColor_3: this.fb.control('', Validators.required),
    criterionStart_4: this.fb.control('', Validators.required),
    criterionEnd_4: this.fb.control('', Validators.required),
    criterionDetail_4: this.fb.control('', Validators.required),
    criterionColor_4: this.fb.control('', Validators.required),
    criterionStart_5: this.fb.control('', Validators.required),
    criterionEnd_5: this.fb.control('', Validators.required),
    criterionDetail_5: this.fb.control('', Validators.required),
    criterionColor_5: this.fb.control('', Validators.required),
  });


  getCriterion() {
    if (this.inspectionModelModule._inspectionId !== '' && this.inspectionModelModule._inspectionId != null) {
      this.apiService.getCriterionByInspectionId(this.inspectionModelModule._inspectionId).subscribe(
        () => {
           this.criterionModel = this.inspectionModelModule._criterionRespModel;
           this.criterions = this.criterionModel.criterionModels;
           this.inspectionName = this.criterionModel.inspectionName;
        }, (err) => {
          console.log('error -> ', err);
        });
    }
  }

  onSaveCriterion() {
    const obj = this.criterionForm.value;
    const jsondata = {
      'criterionModels': [
        {
          'criterionStart': obj.criterionStart_1,
          'criterionEnd': obj.criterionEnd_1,
          'criterionDetail': obj.criterionDetail_1,
          'criterionColor': obj.criterionColor_1
        },
        {
          'criterionStart': obj.criterionStart_2,
          'criterionEnd': obj.criterionEnd_2,
          'criterionDetail': obj.criterionDetail_2,
          'criterionColor': obj.criterionColor_2
        },
        {
          'criterionStart': obj.criterionStart_3,
          'criterionEnd': obj.criterionEnd_3,
          'criterionDetail': obj.criterionDetail_3,
          'criterionColor': obj.criterionColor_3
        },
        {
          'criterionStart': obj.criterionStart_4,
          'criterionEnd': obj.criterionEnd_4,
          'criterionDetail': obj.criterionDetail_4,
          'criterionColor': obj.criterionColor_4
        },
        {
          'criterionStart': obj.criterionStart_5,
          'criterionEnd': obj.criterionEnd_5,
          'criterionDetail': obj.criterionDetail_5,
          'criterionColor': obj.criterionColor_5
        },
      ],
      'inspectionId': this.inspectionModelModule._inspectionId
    };

    const result = this.apiService.saveCriterion(jsondata);
     this.inspectionModelModule._inspectionId = '';
     this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
     this.router.navigate(['/form-assess/manage-inspection']));

  }
  onBack() {
     this.inspectionModelModule._inspectionId = '';
     this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
     this.router.navigate(['/form-assess/manage-inspection']));
   }
  ngOnInit() {
  }

}
