import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './report-routing.module';
import { ChartsComponent } from './report.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
