import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class ProfileModelModule {
  public _userId?: String;
  // public get userId() {
  //   return this._userId;
  // }
  // public set userId(value) {
  //   this._userId = value;
  // }
  public _profileModel?: ProfileModel;
  public _profileModels?: Array<ProfileModel> = [];



  setProfileList(profiles: any) {
    this._profileModels = [];
    for (const pet of profiles) {
      this._profileModels.push(new ProfileModel(pet));
    }
  }

  setProfile(profile: any) {
      this._profileModel = new ProfileModel(profile);
  }
}
export class ProfileModel {
  userId: string;
  userName: string;
  passWord: String;
  titleName: string;
  fertName: string;
  lastName: string;
  fullName: string;
  role: string;
  roleName: string;

  cardId: string;
  age: String;
  phoneNo: string;
  sex: string;
  district: string;
  houseNo: string;
  postal: string;
  province: string;
  subdistrict: string;
  community: String;
  img: String;
  lat: number;
  lng: number;
  constructor(dataLogin: any) {
    this.userId = dataLogin.userId;
    this.userName = dataLogin.userName;
    this.passWord = dataLogin.passWord;
    this.titleName = dataLogin.titleName;
    this.fertName = dataLogin.fertName;
    this.lastName = dataLogin.lastName;
    this.fullName = dataLogin.fullName;
    this.role = dataLogin.role;
    this.roleName = dataLogin.roleName;

    this.cardId = dataLogin.cardId;
    this.age = dataLogin.age;
    this.phoneNo = dataLogin.phoneNo;
    this.sex = dataLogin.sex;
    this.district = dataLogin.district;
    this.houseNo = dataLogin.houseNo;
    this.postal = dataLogin.postal;
    this.province = dataLogin.province;
    this.subdistrict = dataLogin.subdistrict;
    this.community = dataLogin.community;
    this.img = dataLogin.img;
    this.lat = dataLogin.lat;
    this.lng = dataLogin.lng;
  }
}
