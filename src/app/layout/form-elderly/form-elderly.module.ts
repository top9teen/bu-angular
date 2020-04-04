import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormElderlyRoutingModule } from './form-elderly-routing.module';
import { FormElderlyComponent} from './form-elderly.component';
import { PageHeaderModule } from '../../shared';
import { AddElderlyComponent } from './add-elderly/add-elderly.component';
import { ManageElderlyComponent } from './manage-elderly/manage-elderly.component';
import { SharedModule } from '../../shared/shared.module';
import { FormSharedModule} from '../form-shared/form-shared.module';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [CommonModule, FormElderlyRoutingModule, PageHeaderModule, SharedModule, FormSharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7X9xHkQYWB9cD2XK088A_VT_CE4vCsQM'
 })
  ],
  declarations: [FormElderlyComponent, AddElderlyComponent, ManageElderlyComponent],

})
export class FormElderlyModule { }
