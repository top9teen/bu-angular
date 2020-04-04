import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  public _userModel?: UserModel;

  setDateLogin(dataLogin: any) {
    this._userModel = new UserModel(dataLogin);
  }
}

export interface User {
  username: string;
  password: string;
}

export class MenuMain {
  menuId: string;
  menuNameEn: string;
  menuNameTh: string;
  menuUrl: string;
  role: string;
  menuSubs : Array<MenuSub> = [];
}

export class MenuSub {
  menuSubId: string;
  menuId: string;
  menuSubNameEn: string;
  menuSubNameTh: string;
  menuSubUrl: string;
}

export class UserModel {
  userId: string;
  userName: string;
  passWord: String;
  role: String;
  titleName: string;
  fertName: string;
  lastName: string;
  menuMains : Array<MenuMain> = [];
  img : string;
  constructor(dataLogin: any) {
    this.userId = dataLogin.userId;
    this.userName = dataLogin.userName;
    this.passWord = dataLogin.passWord;
    this.role = dataLogin.role;
    this.titleName = dataLogin.titleName;
    this.fertName = dataLogin.fertName;
    this.lastName = dataLogin.lastName;
    this.menuMains = dataLogin.menuMains;
    this.img = dataLogin.img;
  }
}
