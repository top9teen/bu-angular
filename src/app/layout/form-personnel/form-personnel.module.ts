import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPersonnelRoutingModule } from './form-personnel-routing.module';
import { FormPersonnelComponent } from './form-personnel.component';
import { PageHeaderModule } from '../../shared';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { ManagePersonnelComponent } from './manage-personnel/manage-personnel.component';
import { SharedModule } from '../../shared/shared.module';
import { FormSharedModule} from '../form-shared/form-shared.module'


@NgModule({
  imports: [ CommonModule,FormPersonnelRoutingModule, PageHeaderModule, SharedModule,FormSharedModule],
  declarations: [FormPersonnelComponent, AddPersonnelComponent, ManagePersonnelComponent]
})
export class FormPersonnelModule { }
