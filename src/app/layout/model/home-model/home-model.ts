import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class HomeModel {
  public _viewDataHomeModel?: ViewDataHomeModel;
  setViewDataHomeModel(inspection: any){
    this._viewDataHomeModel = new ViewDataHomeModel(inspection);
  }

}

export class ViewDataHomeModel {
  countUserTotal: String;
  inspectionModels: Array<SumInspectionModel> = [];
  constructor(data: any) {
    this.inspectionModels = [];
    this.countUserTotal = data.countUserTotal;
    this.inspectionModels = data.inspectionModels;
  }
}

export class SumInspectionModel {
  name: String;
  count: String;
}
