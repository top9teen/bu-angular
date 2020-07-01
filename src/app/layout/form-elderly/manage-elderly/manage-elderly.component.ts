import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { ProfileModelModule, ProfileModel } from '../../model/profile-model/profile-model.module';
import { Router } from '@angular/router';
import { API_PROFILE_URL } from 'src/app/shared/config/constants';
import { Subject } from 'rxjs';
import { Response, Http } from '@angular/http';
@Component({
  selector: 'app-manage-elderly',
  templateUrl: './manage-elderly.component.html',
  styleUrls: ['./manage-elderly.component.scss']
})


export class ManageElderlyComponent implements OnInit {
  profileModels:  ProfileModel[] = [];
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private apiService: ApiServiceModule,
    private profileModelModule: ProfileModelModule,
    public router: Router,
    private http: Http) { }


async  ngOnInit() {
  await  this.Options();
  await  this.onLoadDate();

  }

  async Options() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

 async onLoadDate() {
      this.http.get(API_PROFILE_URL + '/get-profile-list-by-role/' + '2')
        .subscribe(persons => {
          this.profileModels = this.extractData(persons);
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
      });

  }
  onUpdateProfileElderly(userId?: String) {
    this.profileModelModule._userId = userId;
    this.router.navigate(['/form-elderly/add-elderly']);
  }

  deleteProfile(userId?: String) {
    this.apiService.deleteProfile(userId);
    // this.ngOnInit();
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/form-elderly/manage-elderly']));

  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}
