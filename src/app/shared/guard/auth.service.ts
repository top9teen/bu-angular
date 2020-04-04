import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as Config from '../config/constants';
import { User,UserModel, UserService } from './user.service';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {ProfileModelModule} from './../../layout/model/profile-model/profile-model.module';
@Injectable()
export class AuthService {
    redirectUrl: string;
    isLoggedIn: Boolean = false;
    constructor(
      private http: HttpClient, 
      private router: Router, 
      private userService: UserService,
      private profileModelModule:ProfileModelModule) { 

      }

    login(user: User): Observable<any> {
        if (this.isLoggedIn) {
          return of(true);
        }
    
        if (user.username !== '' && user.password !== '') {
          const _url = `${Config.API_PROFILE_URL}login/`;
          // const _body = `userName=${user.username}&passWord=${user.password}`;
          // const _httpOptions = {
          //   headers: new HttpHeaders({
          //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          //   })
          // };
          const _body = {
            'userName' : user.username,
            'passWord' : user.password};
          const _httpOptions = {
            headers: new HttpHeaders({
               'Content-Type': 'application/json' 
            })
          };
          return this.http.post<any>(_url, _body, _httpOptions)
            .pipe(
              map(response => {
                if (response.data) {
                  this.isLoggedIn = true;
                  this.userService.setDateLogin(response.data);
                  localStorage.setItem('role' ,response.data.role);
                  localStorage.setItem('userId' ,response.data.userId);
                  return of(this.isLoggedIn);
                } else {
                  alert('ชื่อผู้ใช้หรือรหัสผ่านของคุณไม่ถูกต้อง')
                  throw throwError(response.error_description);
                }
              }),
              catchError(error => {
                this.isLoggedIn = false;
                return throwError(error);
              })
            );
        }
      }

      reLogin(userId : String): Observable<any> {
        if (this.isLoggedIn) {
          return of(true);
        }
        if (userId !== '') {
          const _url = `${Config.API_PROFILE_URL}reLogin/` + userId;
          const _httpOptions = {
            headers: new HttpHeaders({
               'Content-Type': 'application/json' 
            })
          };
          return this.http.get<any>(_url, _httpOptions)
            .pipe(
              map(response => {
                if (response.data) {
                  this.isLoggedIn = true;
                  this.userService.setDateLogin(response.data);
                  localStorage.setItem(Config.USER_ID_KEY ,response.data.userId);
                  return of(this.isLoggedIn);
                } else {
                  throw throwError(response.error_description);
                }
              }),
              catchError(error => {
                this.isLoggedIn = false;
                return throwError(error);
              })
            );
        }
      }

      redirectPage() {
        const redirect = this.redirectUrl ? this.redirectUrl : '/';
        const navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };
        this.router.navigate(['/home'], navigationExtras);
       // this.router.navigate([redirect], navigationExtras);
      }

      checkAuthen() {
        const userId = localStorage.getItem(Config.USER_ID_KEY);
        if (userId) {
          if (this.isLoggedIn) {
            console.log('AuthService.checkAuthen [UserId is expired ? false] => redirectPage()');
            this.redirectPage();
          } else {
            console.log('AuthService.checkAuthen [UserId is expired ? true] => reLogin()');
            this.reLogin(userId).subscribe(
              () => {
                if (this.isLoggedIn) {
                  this.redirectPage();
                }
              }, (err) => {
                console.log('error -> ', err);
              });
          }
        }
      }

      logout() {
        localStorage.removeItem(Config.USER_ID_KEY);
        localStorage.removeItem('role');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
}

