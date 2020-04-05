import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../../model/profile-model/profile-model.module';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { ProfileModelModule } from '../../model/profile-model/profile-model.module';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-personnel',
  templateUrl: './manage-personnel.component.html',
  styleUrls: ['./manage-personnel.component.scss']
})
export class ManagePersonnelComponent implements OnInit {

  profileModels: Array<ProfileModel> = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private profileModelModule: ProfileModelModule,
    public router: Router) {
      this.onLoadDate();
  }
  onLoadDate() {
    this.apiService.getProfileListByRole("3").subscribe(
      () => {
        this.profileModels = this.profileModelModule._profileModels;
      }, (err) => {
        console.log('error -> ', err);
      });
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
  //  getProfileListByRole(role : String): Observable<any> {
  //   if (role !== '') {
  //     const _url = `${Config.API_PROFILE_URL}get-profile-list-by-role/`+role;
  //     const _httpOptions = {
  //       headers: new HttpHeaders({
  //          'Content-Type': 'application/json'
  //       })
  //     };
  //     return this.http.get<any>(_url, _httpOptions)
  //       .pipe(
  //         map(response => {
  //           if (response.data) {
  //             // debugger;
  //             this.profileModelModule.setProfileList(response.data);
  //             return of(true);
  //           } else {
  //             throw throwError(response.error_description);
  //           }
  //         }),
  //         catchError(error => {
  //           return throwError(error);
  //         })
  //       );
  //   }
  // }

  ngOnInit() {
    this.onLoadDate();
  }
}
