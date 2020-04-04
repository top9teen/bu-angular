import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
// import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { from } from 'rxjs';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        HomeRoutingModule,
        StatModule
    ],
    declarations: [
        HomeComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class HomeModule {}
