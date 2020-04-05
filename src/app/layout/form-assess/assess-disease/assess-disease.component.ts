import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModel, InspectionModelModule, QuestionModel, ChoiceModel } from '../../model/inspection-model/inspection-model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-assess-disease',
  templateUrl: './assess-disease.component.html',
  styleUrls: ['./assess-disease.component.scss']
})
export class AssessDiseaseComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
    this.onLoadData();

  }
  inspectionModels?: Array<InspectionModel> = [];
  inspectionId: String;
  inspectionModel?: InspectionModel;
  questions: Array<QuestionModel> = [];
  inspectionName: String;

  inspectionForm: FormGroup = this.fb.group({
    inspectionId: this.fb.control('', Validators.required),
  });

  choiceForm: FormGroup = this.fb.group({
    inspectionId: this.fb.control('', Validators.required),
  });

  onLoadData() {
    this.apiService.getListInspection().subscribe(
      () => {
        this.inspectionModels = this.inspectionModelModule._inspectionModels;
      }, (err) => {
        console.log('error -> ', err);
      });
  }

  getQuestion() {
    if (this.inspectionId !== '' && this.inspectionId != null) {
      this.apiService.getInspectionById(this.inspectionId.valueOf()).subscribe(
        () => {
          this.inspectionModel = this.inspectionModelModule._inspectionModel;
          this.questions = this.inspectionModel.questions;
          this.inspectionName = this.inspectionModel.inspectionName;
        }, (err) => {
          console.log('error -> ', err);
        });
    }
  }
  getInspection() {
    this.inspectionId = this.inspectionForm.value.inspectionId;
    this.getQuestion();
  }
  onSubmitForm() {
    const sizeChoice = parseFloat((document.getElementById('sizeChoice') as HTMLInputElement).value);
    let count = 0;
    for (let i = 0; i < sizeChoice; i++) {
      const red = document.getElementsByName('criterion_' + i);
      const lengths = red.length;
      for (let t = 0; t < lengths; t++) {
        const s = (red[t] as HTMLInputElement);
        if (s.checked) {
          count += parseFloat(s.value);
        }
      }
    }

    const jsondata = {
      'count': count,
      'inspectionId': this.inspectionId,
      'userId' : localStorage.getItem('userId')
    };

    console.log(jsondata);
    // var result = this.apiService.saveAssess(jsondata);
    // // debugger;
    // this.inspectionModelModule._inspectionId = '';
    // this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    // this.router.navigate(['/form-assess/manage-question']));

    this.apiService.getsaveAssess(jsondata).subscribe(
      () => {
         this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
         this.router.navigate(['/form-assess/assess-ment']));
      }, (err) => {
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/home']));
      });

  }

  //   onItemChange(value : Event){
  //     console.log(" Value is : ", (value.target as HTMLInputElement).value );
  //     console.log(" Name is : ", (value.target as HTMLInputElement).name );
  //     this.addData((value.target as HTMLInputElement).name ,(value.target as HTMLInputElement).value )
  //     // debugger;
  //     var d = document.getElementsByName("criterion_0");
  //  }
  ngOnInit() {
  }

  addData(name: String, value: String) {



  }
}
