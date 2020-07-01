import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModelModule } from '../../model/inspection-model/inspection-model';
import { Router } from '@angular/router';
import { API_ASSESS_URL } from 'src/app/shared/config/constants';
import { Subject } from 'rxjs';
import { Response, Http } from '@angular/http';

@Component({
  selector: 'app-manage-inspection',
  templateUrl: './manage-inspection.component.html',
  styleUrls: ['./manage-inspection.component.scss']
})
export class ManageInspectionComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  inspectionModels?: Inspection[] = [];

  constructor(
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router,
    private http: Http) {
  }

  ngOnInit() {
    this.Options();
    this.onLoadData();
  }

  async Options() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  onLoadData(){
    this.http.get(API_ASSESS_URL + '/list-inspection')
    .subscribe(persons => {
      this.inspectionModels = this.extractData(persons);
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
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

  extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
}

export class Inspection {
  inspectionId: string;
  inspectionName: string;
}
