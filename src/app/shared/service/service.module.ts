import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AuthService } from '../guard/auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { UserService } from '../guard/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as Config from '../config/constants';
import {ApiServiceModule} from'../../layout/api-service/api-service.module';
import {ProfileModelModule} from'../../layout/model/profile-model/profile-model.module';
import {InspectionModelModule} from'../../layout/model/inspection-model/inspection-model';
import {HomeModel} from'../../layout/model/home-model/home-model';



export function tokenGetter() {
  //return localStorage.getItem(Config.TOKEN_KEY);
}

@NgModule({
  imports: [
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    FormsModule,
    ApiServiceModule,
    ProfileModelModule,
    InspectionModelModule,
    HomeModel
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ReactiveFormsModule,
    ProfileModelModule,
    InspectionModelModule,
    HomeModel
  ]
})
export class ServiceModule { }
