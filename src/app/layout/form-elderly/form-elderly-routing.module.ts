import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormElderlyComponent } from './form-elderly.component';
import { AddElderlyComponent } from './add-elderly/add-elderly.component';
import { ManageElderlyComponent } from './manage-elderly/manage-elderly.component';

const routes: Routes = [
  // {path : '' , component : FormElderlyComponent},
  {path : 'add-elderly' , component : AddElderlyComponent},
  {path : 'manage-elderly' , component : ManageElderlyComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElderlyRoutingModule { }
