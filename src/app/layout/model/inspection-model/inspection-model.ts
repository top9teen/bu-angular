import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class InspectionModelModule {
  public _inspectionId?: String;
  public _inspectionModel?: InspectionModel;
  public _inspectionModels?: Array<InspectionModel> = [];
  public _questionId?: String;
  public _questionModel?: QuestionModel;
  public _criterionRespModel?: CriterionRespModel;
  public _CriterionModel?: CriterionModel;
  public _assessModel?: Array<AssessModel> = [];
  public _assessmentGroupModel?: Array<AssessmentGroupModel> = [];
  public _dataGoogleMapRespModel ?: DataGoogleMapRespModel;
  public _pdfURL?: String;
  public _criterionAssessmentRespModel ?: CriterionAssessmentRespModel;

  setInspectionList(inspections: any) {
    this._inspectionModels = [];
    for (const pet of inspections) {
      this._inspectionModels.push(new InspectionModel(pet));
    }
  }
  setInspection(inspection: any) {
    this._inspectionModel = new InspectionModel(inspection);
  }

  setQuestion(question: any) {
    this._questionModel = new QuestionModel(question);
  }

  setCriterion(criterion: any) {
    this._criterionRespModel = new CriterionRespModel(criterion);
  }

  setCriterionModel(criterion: any) {
    this._CriterionModel = new CriterionModel(criterion);
  }

  setAssessModel(assess: any) {
    this._assessModel = [];
    for (const pet of assess) {
      this._assessModel.push(new AssessModel(pet));
    }
  }
  setAssessmentGroupModel(assess: any) {
    this._assessmentGroupModel = [];
    for (const pet of assess) {
      this._assessmentGroupModel.push(new AssessmentGroupModel(pet));
    }
  }
  setDataGoogleMapRespModel(criterion: any) {
    this._dataGoogleMapRespModel = new DataGoogleMapRespModel(criterion);
  }
  setPDFURL(url: any) {
    this._pdfURL = url;
  }
  setCriterionAssessmentRespModel(obj: any) {
    this._criterionAssessmentRespModel = new CriterionAssessmentRespModel(obj);
  }

}

export class InspectionModel {
  inspectionId: string;
  inspectionName: string;
  questions: Array<QuestionModel> = [];
  constructor(Inspection: any) {
    this.questions = [];
    this.inspectionId = Inspection.inspectionId;
    this.inspectionName = Inspection.inspectionName;
    this.questions = Inspection.questions;
  }
}
export class QuestionModel {
  questionId: string;
  questionName: string;
  choices: Array<ChoiceModel> = [];
  constructor(question: any) {
    this.choices = [];
    this.questionId = question.questionId;
    this.questionName = question.questionName;
    this.choices = question.choices;
  }

}

export class ChoiceModel {
  choiceId: string;
  choiceName: string;
  choiceCriterion: string;
  // constructor(Inspection: any) {
  //   this.questionId = Inspection.questionId;
  //   this.questionId = Inspection.questionId;
  // }

}

export class CriterionRespModel {
  inspectionId: String;
  inspectionName: String;
  criterionModels: Array<CriterionModel> = [];
  constructor(criterion: any) {
    this.criterionModels = [];
    this.inspectionId = criterion.inspectionId;
    this.inspectionName = criterion.inspectionName;
    this.criterionModels = criterion.criterionModels;
  }
}

export class CriterionModel {
  criterionDetail: String;
  criterionEnd: String;
  criterionStart: String;
  criterionColor: String;
  constructor(criterion: any) {
    this.criterionDetail = criterion.criterionDetail;

  }

}

export class AssessModel {
  assessmentId: String;
  assessmentDetail: String;
  createDate: String;
  inspetionDetail: String;
  criterionTotal: String;
  constructor(assess: any) {
    this.assessmentId = assess.assessmentId;
    this.assessmentDetail = assess.assessmentDetail;
    this.createDate = assess.createDate;
    this.inspetionDetail = assess.inspetionDetail;
    this.criterionTotal = assess.criterionTotal;
  }
}

export class AssessmentGroupModel {
  count: String;
  community: String;
  constructor(assess: any) {
    this.count = assess.count;
    this.community = assess.community;
  }
}


export class DataGoogleMapRespModel {
  dataGoogleDetails: Array<DataGoogleDetail> = [];
  dataCriterionDetails: Array<DataCriterionDetail> = [];
  constructor(data: any) {
    this.dataGoogleDetails = data.dataGoogleDetails;
    this.dataCriterionDetails = data.dataCriterionDetails;
  }
}

export class DataGoogleDetail {
  lat: String;
  lng: String;
  marker: String;
  name: String;
  userId: String;
  assessmentId: String;
  assessmentDetail: String;
  community: String;
  lavel: String;
  inspectionsName: string;
  strdate: Date;
}

export class DataCriterionDetail {
  marker: String;
  criterDetail: String;
}

export class CriterionAssessmentRespModel {
  criterionDetail: String;
  assessmentId: String;
  constructor(data: any) {
    this.criterionDetail = data.criterionDetail;
    this.assessmentId = data.assessmentId;
  }
}
