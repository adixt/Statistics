import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Module5Component } from './module5.component';

const routes: Routes = [{ path: '', component: Module5Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module5RoutingModule { }
