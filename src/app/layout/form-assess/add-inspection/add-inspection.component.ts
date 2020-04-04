import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { InspectionModel, InspectionModelModule } from '../../model/inspection-model/inspection-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.scss']
})
export class AddInspectionComponent implements OnInit {
  inspectionModel: InspectionModel;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private inspectionModelModule: InspectionModelModule,
    public router: Router) {
    this.getInspection();
  }

  getInspection() {
    if (this.inspectionModelModule._inspectionId != '' && this.inspectionModelModule._inspectionId != null) {
      this.apiService.getInspectionById(this.inspectionModelModule._inspectionId).subscribe(
        () => {
          this.inspectionModel = this.inspectionModelModule._inspectionModel;
        }, (err) => {
          console.log('error -> ', err);
        });
    } else {
      this.inspectionModel = null;
    }
  }

  inspectionForm: FormGroup = this.fb.group({
    inspectionName: this.fb.control('', Validators.required),
    inspectionId: this.inspectionModelModule._inspectionId
  })

  saveInspection() {
    var result = this.apiService.saveInspection(this.inspectionForm.value);
    this.inspectionModelModule._inspectionId = '';
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/form-assess/manage-inspection']));
  }

  onBack() {
    this.inspectionModelModule._inspectionId = '';
    this.inspectionModelModule._questionId = '';
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/form-assess/manage-inspection']));
  }

  ngOnInit() {
  }

}
