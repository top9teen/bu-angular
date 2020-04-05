import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Config from '../../shared/config/constants';
import { Observable, from, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProfileModelModule, ProfileModel } from '../model/profile-model/profile-model.module';
import { InspectionModelModule } from '../model/inspection-model/inspection-model';
import { HomeModel} from '../model/home-model/home-model';
import { debug } from 'util';
import { Data } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ApiServiceModule {
  redirectUrl: string;
  constructor(
    private http: HttpClient,
    private profileModelModule: ProfileModelModule,
    private inspectionModelModule: InspectionModelModule,
    private homeModel: HomeModel,
    private router: Router
  ) {

  }

  redirectPage(url: String) {
    const redirect = this.redirectUrl ? this.redirectUrl : '/';
    const navigationExtras: NavigationExtras = {
      preserveQueryParams: true,
      preserveFragment: true
    };
    this.router.navigate([url], navigationExtras);
    // this.router.navigate([redirect], navigationExtras);
  }

  getProfileListByRole(role: String): Observable<any> {
    if (role !== '') {
      const _url = `${Config.API_PROFILE_URL}get-profile-list-by-role/` + role;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(_url, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              this.profileModelModule.setProfileList(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );
    }
  }

  getProfileByUserId(userId: String): Observable<any> {
    debug;
    if (userId !== '') {
      const _url = `${Config.API_PROFILE_URL}get-profile-by-userId/` + userId;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(_url, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              this.profileModelModule.setProfile(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );
    }
  }

  saveProfile(data: Data) {
    const _url = `${Config.API_PROFILE_URL}save-profile/`;
    const _body = data;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.http.post<any>(_url, _body, _httpOptions)

    from(this.http.post<any>(_url, _body, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));

  }

  deleteProfile(userId: String) {
    const _url = `${Config.API_PROFILE_URL}delete-profile/` + userId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.http.post<any>(_url, _body, _httpOptions)

    from(this.http.get<any>(_url, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));

  }

  getListInspection(): Observable<any> {

    const _url = `${Config.API_ASSESS_URL}list-inspection`;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(_url, _httpOptions)
      .pipe(
        map(response => {
          if (response.data) {
            this.inspectionModelModule.setInspectionList(response.data);
            return of(true);
          } else {
            throw throwError(Config.ERROR_001);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getInspectionById(inspectionId: String): Observable<any> {
    if (inspectionId !== '') {
      const _url = `${Config.API_ASSESS_URL}get-inspection-by-id/` + inspectionId;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(_url, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              this.inspectionModelModule.setInspection(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );
    }

  }

  saveInspection(data: Data) {
    const _url = `${Config.API_ASSESS_URL}save-inspection/`;
    const _body = data;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.http.post<any>(_url, _body, _httpOptions)

    from(this.http.post<any>(_url, _body, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));

  }

  deleteInspection(inspectionId: String) {
    const _url = `${Config.API_ASSESS_URL}delete-inspection/` + inspectionId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    from(this.http.get<any>(_url, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));

  }

  getQuestionById(questionId: String): Observable<any> {
    if (questionId !== '') {
      const _url = `${Config.API_ASSESS_URL}get-question-by-id/` + questionId;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(_url, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              this.inspectionModelModule.setQuestion(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );

    }

  }

  saveQuestion(data: Data) {
    const _url = `${Config.API_ASSESS_URL}save-question/`;
    const _body = data;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    from(this.http.post<any>(_url, _body, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));
  }


  deleteQuestion(questionId: String) {
    const _url = `${Config.API_ASSESS_URL}delete-question/` + questionId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.http.post<any>(_url, _body, _httpOptions)

    from(this.http.get<any>(_url, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));

  }

  getCriterionByInspectionId(inspectionId: String): Observable<any> {
    if (inspectionId !== '') {
      const _url = `${Config.API_ASSESS_URL}get-criterion-by-inspectionId/` + inspectionId;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(_url, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              // debugger;
              this.inspectionModelModule.setCriterion(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );
    }

  }

  saveCriterion(data: Data) {
    const _url = `${Config.API_ASSESS_URL}save-criterion/`;
    const _body = data;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    from(this.http.post<any>(_url, _body, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));
  }


  saveAssess(data: Data) {
    const _url = `${Config.API_ASSESS_URL}save-assessment/`;
    const _body = data;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    from(this.http.post<any>(_url, _body, _httpOptions).toPromise().then((res) => {
      // debugger;
      return res.data;
    }));
  }

  getsaveAssess(datas: Data): Observable<any> {
      const _url = `${Config.API_ASSESS_URL}save-assessment/`;
      const _body = datas;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(_url, _body, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              this.inspectionModelModule.setCriterionAssessmentRespModel(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );
  }

  saveChangePassword(data: Data) {
    const _url = `${Config.API_PROFILE_URL}change-password/`;
    const _body = data;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    from(this.http.post<any>(_url, _body, _httpOptions).toPromise().then((res) => {
      return res.data;
    }));
  }

  getHomeViewData(): Observable<any> {

      const _url = `${Config.API_PROFILE_URL}view-data-home`;
      const _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(_url, _httpOptions)
        .pipe(
          map(response => {
            if (response.data) {
              this.homeModel.setViewDataHomeModel(response.data);
              return of(true);
            } else {
              throw throwError(Config.ERROR_001);
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );

  }
  getAssess(userId: String, inspectionId: String): Observable<any> {
    const _url = `${Config.API_ASSESS_URL}get-assessment-by-userId/` + userId + '/' + inspectionId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(_url, _httpOptions)
      .pipe(
        map(response => {
          if (response.data) {
            this.inspectionModelModule.setAssessModel(response.data);
            return of(true);
          } else {
            throw throwError(Config.ERROR_001);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getAssessByInspecion(inspectionId: String): Observable<any> {
    const _url = `${Config.API_ASSESS_URL}get-assessment-by-inspectionId/` + inspectionId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(_url, _httpOptions)
      .pipe(
        map(response => {
          if (response.data) {
            this.inspectionModelModule.setAssessmentGroupModel(response.data);
            return of(true);
          } else {
            throw throwError(Config.ERROR_001);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getDataMapByInspectionId(inspectionId: String): Observable<any> {
    const _url = `${Config.API_ASSESS_URL}get-datamap-by-inspectionId/` + inspectionId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(_url, _httpOptions)
      .pipe(
        map(response => {
          if (response.data) {
            this.inspectionModelModule.setDataGoogleMapRespModel(response.data);
            return of(true);
          } else {
            throw throwError(Config.ERROR_001);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getDataMap(datas: Data): Observable<any> {
    const _url = `${Config.API_ASSESS_URL}get-datamap/`;
    const _body = datas;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(_url, _body, _httpOptions)
      .pipe(
        map(response => {
          if (response.data) {
            this.inspectionModelModule.setDataGoogleMapRespModel(response.data);
            return of(true);
          } else {
            throw throwError(Config.ERROR_001);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
}


getAssessByInspecionAndDate(datas: Data): Observable<any> {
  const _url = `${Config.API_ASSESS_URL}get-assessment/`;
  const _body = datas;
  const _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.http.post<any>(_url, _body, _httpOptions)
    .pipe(
      map(response => {
        if (response.data) {
          this.inspectionModelModule.setAssessmentGroupModel(response.data);
          return of(true);
        } else {
          throw throwError(Config.ERROR_001);
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
}

  printPdf(assessmentId: String): Observable<any> {
    const _url = `${Config.API_ASSESS_URL}print-report/` + assessmentId;
    const _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(_url, _httpOptions)
      .pipe(
        map(response => {
          if (response.data) {
            this.inspectionModelModule.setPDFURL(response.data);
            return of(true);
          } else {
            throw throwError(Config.ERROR_001);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
