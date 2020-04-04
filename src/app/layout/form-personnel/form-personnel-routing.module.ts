import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPersonnelComponent } from './form-personnel.component';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { ManagePersonnelComponent } from './manage-personnel/manage-personnel.component';
const routes: Routes = [
  // {path : '' , component : FormPersonnelComponent},
  {path : 'add-personnel' , component : AddPersonnelComponent},
  {path : 'manage-personnel' , component : ManagePersonnelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormPersonnelRoutingModule { }
