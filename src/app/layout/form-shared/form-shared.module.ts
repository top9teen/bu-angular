import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSharedRoutingModule } from './form-shared-routing.module';
import { FormUserComponent } from './form-user/form-user.component';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [FormUserComponent],
  imports: [
    CommonModule,
    FormSharedRoutingModule,
    SharedModule,
    PageHeaderModule
  ],exports:[
    FormUserComponent
  ]
})
export class FormSharedModule { }
