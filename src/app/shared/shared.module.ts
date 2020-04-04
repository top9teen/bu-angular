import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: ''
  })
  ], exports: [
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class SharedModule { }
