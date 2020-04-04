import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        // FormsModule, 
        // ReactiveFormsModule,
        SharedModule,
        LoginRoutingModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
