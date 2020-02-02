import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Module6Component } from './module6.component';

const routes: Routes = [{ path: '', component: Module6Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module6RoutingModule { }
