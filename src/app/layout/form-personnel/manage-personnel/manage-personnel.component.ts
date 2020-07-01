import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../../model/profile-model/profile-model.module';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { ProfileModelModule } from '../../model/profile-model/profile-model.module';
import { Router } from '@angular/router';
import { API_PROFILE_URL } from 'src/app/shared/config/constants';
import { Subject } from 'rxjs';
import { Response, Http } from '@angular/http';
@Component({
  selector: 'app-manage-personnel',
  templateUrl: './manage-personnel.component.html',
  styleUrls: ['./manage-personnel.component.scss']
})
export class ManagePersonnelComponent implements OnInit {

  profileModels: ProfileModel[] = [];
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  constructor(
    private apiService: ApiServiceModule,
    private profileModelModule: ProfileModelModule,
    public router: Router,
    private http: Http) {
  }

  ngOnInit() {
    this.onLoadDate();
  }

  async onLoadDate() {
    this.http.get(API_PROFILE_URL + '/get-profile-list-by-role/' + '3')
      .subscribe(persons => {
        this.profileModels = this.extractData(persons);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
    });
  }

  async Options() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  onUpdateProfileElderly(userId?: String) {
    this.profileModelModule._userId = userId;
    this.router.navigate(['/form-personnel/add-personnel']);
  }

  deleteProfile(userId?: String) {
    this.apiService.deleteProfile(userId);
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/form-personnel/manage-personnel']));

  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}
