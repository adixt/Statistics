import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Module8Component } from './module8.component';

const routes: Routes = [{ path: '', component: Module8Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module8RoutingModule { }
