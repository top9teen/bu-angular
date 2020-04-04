import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ServiceModule } from './shared/service/service.module';
import { SharedModule } from './shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { AgmCoreModule} from '@agm/core';


export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ServiceModule,
        SharedModule,
        DataTablesModule,
        BsDatepickerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA7X9xHkQYWB9cD2XK088A_VT_CE4vCsQM'
        })
    ],
    declarations: [AppComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
