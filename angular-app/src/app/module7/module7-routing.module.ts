import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Module7Component } from './module7.component';

const routes: Routes = [{ path: '', component: Module7Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module7RoutingModule { }
