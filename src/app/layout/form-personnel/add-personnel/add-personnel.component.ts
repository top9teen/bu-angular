import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared/guard/auth.service';
import { Router } from '@angular/router';
import * as Config from '../../../shared/config/constants';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiServiceModule} from'../../api-service/api-service.module';
import {ProfileModelModule,ProfileModel} from '../../model/profile-model/profile-model.module';


@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent implements OnInit {

  profileModel : ProfileModel;
  showActions : boolean = true;
  constructor(
    private fb: FormBuilder,
    private apiService :ApiServiceModule,
    private profileModelModule : ProfileModelModule,
    public router: Router) {
      debugger;
      this.getProfile();
     
  }
  public imagePath;
  imgURL: any;
  public message: string;
  public fileImg ;
  preview(files) {
    if (files.length === 0)
      return;
      this.fileImg = files;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    
  }

  getProfile(){
    debugger;
    if("" != this.profileModelModule._userId && this.profileModelModule._userId != null && this.profileModelModule._userId != undefined){
      this.showActions = false; 
      this.apiService.getProfileByUserId(this.profileModelModule._userId).subscribe(
        () => {
          debugger;
          this.profileModel = this.profileModelModule._profileModel;
          this.imgURL = this.profileModel.img; 
        }, (err) => {
          console.log('error -> ', err);
        });
    }  
  }

  profileForm: FormGroup= this.fb.group({
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
     role: this.fb.control('', Validators.required),
     userId :this.fb.control('', Validators.required),
    
  });

  ngOnInit() {
  }

  saveProfile(){
    debugger;
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
       role: obj.role,
       userId : obj.userId,
      'img':  this.imgURL
    }
    debugger;
    this.apiService.saveProfile(jsondata); 
   // this.apiService.saveProfile(this.profileForm.value);
    this.profileModelModule._userId = '';
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/form-personnel/manage-personnel']));
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
