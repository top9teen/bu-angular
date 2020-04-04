import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { PageHeaderModule } from '../../shared';
import { SharedModule } from '../../shared/shared.module';
import { FormSharedModule} from '../form-shared/form-shared.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component'


@NgModule({
  imports: [CommonModule, ChangePasswordRoutingModule, PageHeaderModule,SharedModule,FormSharedModule],
  declarations: [ ChangepasswordComponent],
})
export class ChangePasswordModule { }
