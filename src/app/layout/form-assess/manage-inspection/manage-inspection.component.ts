import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModel, InspectionModelModule } from '../../model/inspection-model/inspection-model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ReferenceAst } from '@angular/compiler';


@Component({
  selector: 'app-manage-inspection',
  templateUrl: './manage-inspection.component.html',
  styleUrls: ['./manage-inspection.component.scss']
})
export class ManageInspectionComponent implements OnInit {
  inspectionModels?: Array<InspectionModel> = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
       this.onLoadData();
  }

  onLoadData(){
    this.apiService.getListInspection().subscribe(
      () => {
        this.inspectionModels = this.inspectionModelModule._inspectionModels;
      }, (err) => {
        console.log('error -> ', err);
      });
  }
  onUpdateInspection(inspectionId?: String) {
    this.inspectionModelModule._inspectionId = inspectionId;
    this.router.navigate(['/form-assess/add-inspection']);
  }

  onDeleteInspection(inspectionId?: String) {
    this.apiService.deleteInspection(inspectionId);
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/form-assess/manage-inspection']));
  }

  onManageQuestion(inspectionId?: String){
    this.inspectionModelModule._inspectionId = inspectionId;
    this.router.navigate(['/form-assess/manage-question']);
  }

  onAddEvaluation(inspectionId?: String){
    this.inspectionModelModule._inspectionId = inspectionId;
    this.router.navigate(['/form-assess/add-evaluation']);
  }

  ngOnInit() {
    this.onLoadData();
  };
  
}
