import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './report.component';

const routes: Routes = [
    {
        path: '',
        component: ChartsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule {}
