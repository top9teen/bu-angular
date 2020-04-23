import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileModel } from '../../model/profile-model/profile-model.module';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { ProfileModelModule } from '../../model/profile-model/profile-model.module';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_PROFILE_URL } from 'src/app/shared/config/constants';

@Component({
  selector: 'app-manage-elderly',
  templateUrl: './manage-elderly.component.html',
  styleUrls: ['./manage-elderly.component.scss']
})
export class ManageElderlyComponent implements OnInit {
  profileModels: Array<ProfileModel> = [];
  @ViewChild('dataTable') table;
  dataTable: any;
  tableData: Profile[] = [];
  dtOptions: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private profileModelModule: ProfileModelModule,
    public router: Router) { }


  ngOnInit() {
    // this.onLoadDate();
    this.getProfile();

  }

  getProfile() {
    this.http.get(API_PROFILE_URL + '/get-profile-list-by-role/' + '2').subscribe(
      (data: Profile[]) => {
        this.tableData = data;
        this.dtOptions = {
          data: this.tableData,
          pagingType: 'full_numbers',
          pageLength: 15,
          processing: true,
          // order: [0, 'asc'],
          // dom: 'Bfrtip',
          // buttons: [
          //   'copy', 'csv', 'excel', 'print'
          // ],
          columns: [
            { title: 'ชื่อบัญชี', data: 'userName' },
            { title: 'ชื่อ - สกุล', data: 'fullName' },
            { title: 'ชุมชน', data: 'community' },
            { title: 'สิทธิ์', data: 'role' },
            { title: '', defaultContent: '<button onclick="ddd()" type="button" class="btn btn-warning">แก้ไข</button>' },
            {
              title: '',
              data: null,
              orderable: true,
              render: function (data1, type, item, meta) {
                return '<button  (click)="testClick()" type="button" class="btn btn-danger">ลบ</button>';
              }
            },
            {
              data: 'MachineNumber', 'width': '50px', 'render': function (data22) {
                return '<button (click)="testClick()" type="button" class="btn btn-primary">testClick</button>';
              }
            }
          ],
        };
        $(document).on('click', 'tr', function () {
          $('.username').text('');
          $('.username').text($(this).parents('tr').find('.fname').text());
          alert('clicked!');
        });
      }, err => { }, () => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);

      });
  }

  ddd() {
    console.log('ssss');
    alert('ddd');
  }

  testClick() {
    console.log('xxxx');
    alert('testClick');
  }
  onLoadDate() {
    this.apiService.getProfileListByRole('2').subscribe(
      () => {
        this.profileModels = this.profileModelModule._profileModels;
      }, (err) => {
        console.log('error -> ', err);
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



}


export interface Profile {
  userId: string;
  userName: string;
  passWord?: any;
  fullName: string;
  role: string;
  roleName?: any;
  cardId?: any;
  titleName?: any;
  fertName?: any;
  lastName?: any;
  age?: any;
  phoneNo?: any;
  sex?: any;
  district?: any;
  houseNo?: any;
  postal?: any;
  province?: any;
  subdistrict?: any;
  community: string;
  img?: any;
  lat?: any;
  lng?: any;
}
