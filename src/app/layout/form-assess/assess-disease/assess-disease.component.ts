import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModel, InspectionModelModule, QuestionModel } from '../../model/inspection-model/inspection-model';

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
  result: Array<SubmitQ> = [];
  inspectionName: String;
  checkQ = 0;
  disabled = false;
  assessmentId = 0;
  Q2 = false;
  Q8 = false;
  Q9 = false;

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

  async getQuestion(Q: number) {
    if (this.inspectionId !== '' && this.inspectionId != null) {
      await this.apiService.getInspectionById(this.inspectionId.valueOf(), Q).subscribe(
        () => {
          this.inspectionModel = this.inspectionModelModule._inspectionModel;
          this.questions = this.inspectionModel.questions;
          this.inspectionName = this.inspectionModel.inspectionName;
          if (Q === 8) {
            this.addFromSubmit(this.assessmentId);
          }
        }, (err) => {
          console.log('error -> ', err);
        });
    }
  }


  getInspection() {
    this.inspectionId = this.inspectionForm.value.inspectionId;
    if (this.inspectionId === '2') {
      this.checkQ = 2;
      this.Q2 =  true;
    } else {
      this.checkQ = 0;
      this.Q2 = false;
      this.Q8 = false;
      this.Q9 = false;
    }
    this.getQuestion(this.checkQ);
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

 onSubmitForm2Q() {
    let answer = {} as SubmitQ;
    const sizeChoice = parseFloat((document.getElementById('sizeChoice') as HTMLInputElement).value);
      for (let i = 0; i < sizeChoice; i++) {
        const red = document.getElementsByName('criterion_' + i);
        const lengths = red.length;
        for (let t = 0; t < lengths; t++) {
          const s = (red[t] as HTMLInputElement);
          if (s.checked) {
            answer.answer = t;
            answer.userId = localStorage.getItem('userId');
            const x = this.inspectionId;
            const y: number = +x;
            answer.question_id = y;
            this.result.push(answer);
            answer = {} as SubmitQ;
          }
        }
      }
      for (let j = 0; j < this.questions.length; j++) {
        this.result[j].question_id = + this.inspectionId;
        this.result[j].assessmentId = this.assessmentId;
      }
      console.log('result :: ' + JSON.stringify(this.result));
    this.apiService.getsaveAssess2Q(this.result).subscribe(
      (res: ResultSubmit) => {
        console.log(JSON.stringify(res));
        if (res.status) {
            this.Q2 =  false;
            this.Q8 =  false;
            this.Q9 = true;
            this.checkQ = 0;
            this.assessmentId = res.assessmentId;
            this.getQuestion(this.checkQ);
            this.addFromSubmit(this.assessmentId);
         } else {
          this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/form-assess/assess-ment']));
        }
      }, (err) => {
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/home']));
      });
    this.result = [];
  }

  onSubmitForm9Q() {
    let answer = {} as SubmitQ;
    const sizeChoice = parseFloat((document.getElementById('sizeChoice') as HTMLInputElement).value);
      for (let i = 0; i < sizeChoice; i++) {
        const red = document.getElementsByName('criterion_' + i);
        const lengths = red.length;
        for (let t = 0; t < lengths; t++) {
          const s = (red[t] as HTMLInputElement);
          if (s.checked) {
            answer.answer = t;
            answer.userId = localStorage.getItem('userId');
            this.result.push(answer);
            answer = {} as SubmitQ;
          }
        }
      }
      for (let j = 0; j < this.questions.length; j++) {
        this.result[j].question_id = + this.inspectionId;
        this.result[j].assessmentId = this.assessmentId;
      }
      console.log('result :: ' + JSON.stringify(this.result));
    this.apiService.getsaveAssess9Q(this.result).subscribe(
      (res: ResultSubmit) => {
        if (res.status) {
            this.Q2 =  false;
            this.Q8 =  true;
            this.Q9 = false;
            this.checkQ = 8;
            this.assessmentId = res.assessmentId;
            this.getQuestion(this.checkQ);
        } else {
          this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/form-assess/assess-ment']));
        }
      }, (err) => {
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/home']));
      });
    this.result = [];
  }

  onSubmitForm8Q() {
    for (let j = 0; j < this.questions.length; j++) {
      this.result[j].question_id = + this.inspectionId;
    }
    console.log('result :: ' + JSON.stringify(this.result));

    this.apiService.getsaveAssess2Q(this.result).subscribe(
      (res: ResultSubmit) => {
        if (res.status) {
          alert(res.detail);
          this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/form-assess/assess-ment']));
        } else {
          this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/form-assess/assess-ment']));
        }

      }, (err) => {
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/home']));
      });
    this.result = [];
  }

  // /form-assess/assess-disease
  //   onItemChange(value : Event){
  //     console.log(" Value is : ", (value.target as HTMLInputElement).value );
  //     console.log(" Name is : ", (value.target as HTMLInputElement).name );
  //     this.addData((value.target as HTMLInputElement).name ,(value.target as HTMLInputElement).value )
  //     // debugger;
  //     var d = document.getElementsByName("criterion_0");
  //  }

  addFromSubmit(assessmentId: number) {
    this.result = [];
    if (this.questions.length > 0) {
      let answer = {} as SubmitQ;
      for (let j = 0; j < this.questions.length; j++) {
          answer.question_id = + this.questions[j].questionId;
          answer.userId = localStorage.getItem('userId');
          answer.assessmentId = assessmentId;
          this.result.push(answer);
          answer = {} as SubmitQ;
      }
    }
  }

  onChange(index: number, data: string, questId: number) {
    console.log('index input :: ' + index);
    console.log('questId  :: ' + questId);
    console.log('data input :: ' + data);
    const texterror = /^[0-9]+$/;
    console.log('data if :: ' + texterror.test(data));
    if (!texterror.test(data)) {
      console.log('data if ===============' );
      if (index === 3) {
        this.disabled = false;
      }
      if (this.result.length > 0) {
        for (let j = 0; j < this.result.length; j++) {
          if (this.result[j].question_id === questId) {
              this.result[j].answer = 0;
            break;
          }
        }
      }
    } else {
        if (index === 3) {
          this.disabled = true;
        }
      if (this.result.length > 0) {
        for (let j = 0; j < this.result.length; j++) {
          if (this.result[j].question_id === questId) {
              this.result[j].answer = + data;
            break;
          }
        }
      }
    }
    console.log('result :: ' + JSON.stringify(this.result));
  }

  onBack() {
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/form-assess/assess-disease']));
  }
  ngOnInit() {
  }

  addData(name: String, value: String) {



  }
}

interface SubmitQ {
  assessmentId: number;
  answer: number;
  question_id: number;
  userId: string;
}

interface ResultSubmit {
  assessmentId: number;
  status: boolean;
  detail: string;
}
