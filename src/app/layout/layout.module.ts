import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { EverydaylifeComponent } from './everydaylife/everydaylife.component';
import { DepressionComponent } from './depression/depression.component';
import { OsteoarthritisComponent } from './osteoarthritis/osteoarthritis.component';
import { UrinaryincontinenceComponent } from './urinaryincontinence/urinaryincontinence.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule
    ],
    declarations: [LayoutComponent, 
        SidebarComponent, 
        HeaderComponent,
        EverydaylifeComponent,
        DepressionComponent, 
        OsteoarthritisComponent, 
        UrinaryincontinenceComponent, 
        NutritionComponent, 
        ProfileComponent, 
        UsersComponent,]
})
export class LayoutModule { }
