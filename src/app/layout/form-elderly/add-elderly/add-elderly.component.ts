import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared/guard/auth.service';
import { Router } from '@angular/router';
import * as Config from '../../../shared/config/constants';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiServiceModule} from '../../api-service/api-service.module';
import {ProfileModelModule, ProfileModel} from '../../model/profile-model/profile-model.module';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-add-elderly',
  templateUrl: './add-elderly.component.html',
  styleUrls: ['./add-elderly.component.scss']
})
export class AddElderlyComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceModule,
    private profileModelModule: ProfileModelModule,
    public router: Router) {
      this.getProfile();

  }
  // lat;
  // lng;
  lat = 14.633426;
  lng = 102.794541;
  zoom = 15;
  profileModel: ProfileModel;
  showActions = true;
  public imagePath;
  imgURL: any;
  public message: string;
  public fileImg ;



  profileForm: FormGroup = this.fb.group({
    cardId: this.fb.control('', Validators.required),
    age: this.fb.control('', Validators.required),
    titleName: this.fb.control('', Validators.required),
    fertName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    phoneNo: this.fb.control('', Validators.required),
    sex: this.fb.control('', Validators.required),

    houseNo: this.fb.control('', Validators.required),
    subdistrict: this.fb.control('', Validators.required),
    district: this.fb.control('', Validators.required),
    province: this.fb.control('', Validators.required),
    postal: this.fb.control('', Validators.required),
    community: this.fb.control('', Validators.required),

     userName: this.fb.control('', Validators.required),
     passWord: this.fb.control('', Validators.required),
     role: '2',
     userId : this.fb.control('', Validators.required),

  });
  markers: marker[] = [];

  mapClicked($event: MouseEvent) {
    // console.log(Location.);
    // console.log($event.coords.lat, $event.coords.lng);
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
  clickedMarker(label: string, index: number) {

  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
      this.fileImg = files;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };

  }

  getProfile() {
    if (localStorage.getItem('role') === '2') {
      this.showActions = false;
      this.apiService.getProfileByUserId(localStorage.getItem('userId')).subscribe(
        () => {
          this.profileModel = this.profileModelModule._profileModel;
          this.imgURL = this.profileModel.img;
          this.lat = this.profileModel.lat;
          this.lng = this.profileModel.lng;
        }, (err) => {
          console.log('error -> ', err);
        });
    } else if (this.profileModelModule._userId !== ''  && this.profileModelModule._userId != null) {
      this.showActions = true;
      this.apiService.getProfileByUserId(this.profileModelModule._userId).subscribe(
        () => {
          this.profileModel = this.profileModelModule._profileModel;
          this.imgURL = this.profileModel.img;
          this.lat = this.profileModel.lat;
          this.lng = this.profileModel.lng;
        }, (err) => {
          console.log('error -> ', err);
        });
    }

  }

  ngOnInit() {
  }

  saveProfile() {
    const obj = this.profileForm.value;
    const jsondata = {
      cardId: obj.cardId,
      age: obj.age,
      titleName: obj.titleName,
      fertName: obj.fertName,
      lastName: obj.lastName,
      phoneNo: obj.phoneNo,
      sex: obj.sex,

      houseNo: obj.houseNo,
      subdistrict: obj.subdistrict,
      district: obj.district,
      province: obj.province,
      postal: obj.postal,
      community: obj.community,

       userName: obj.userName,
       passWord: obj.passWord,
       role: '2',
       userId : obj.userId,
      'img':  this.imgURL,
      lat : this.lat,
      lng : this.lng
    };
    this.apiService.saveProfile(jsondata);
   // this.apiService.saveProfile(this.profileForm.value);
    this.profileModelModule._userId = '';
    this.router.navigate(['/home']);
    // const _url = `${Config.API_PROFILE_URL}save-profile/`;
    // const _body = this.profileForm.value;
    // const _httpOptions = {
    //   headers: new HttpHeaders({
    //      'Content-Type': 'application/json'
    //   })
    // };
    // // return this.http.post<any>(_url, _body, _httpOptions)

    // var data = from(this.http.post<any>(_url, _body,_httpOptions).toPromise().then((res) => {
    //   return res.data;
    // }));

  }

  onBack() {
    this.profileModelModule._userId = '';
    this.router.navigate(['/home']);
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
