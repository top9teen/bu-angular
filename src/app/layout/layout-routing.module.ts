import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { EverydaylifeComponent } from './everydaylife/everydaylife.component';
import { DepressionComponent } from './depression/depression.component';
import { OsteoarthritisComponent } from './osteoarthritis/osteoarthritis.component';
import { UrinaryincontinenceComponent } from './urinaryincontinence/urinaryincontinence.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'report', loadChildren: './report/report.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'form-elderly', loadChildren : './form-elderly/form-elderly.module#FormElderlyModule'},
            { path: 'form-personnel',loadChildren: './form-personnel/form-personnel.module#FormPersonnelModule'},
            { path: 'form-assess',loadChildren: './form-assess/form-assess.module#FormAssessModule'},
            { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule'},
            { path: 'everydaylife', component: EverydaylifeComponent },
            { path: 'depression', component: DepressionComponent },
            { path: 'osteoarthritis', component: OsteoarthritisComponent },
            { path: 'urinaryincontinence', component: UrinaryincontinenceComponent },
            { path: 'nutrition', component: NutritionComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'users', component: UsersComponent},
        

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
