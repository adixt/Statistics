import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module4RoutingModule } from './module4-routing.module';
import { Module4Component } from './module4.component';


@NgModule({
  declarations: [Module4Component],
  imports: [
    CommonModule,
    Module4RoutingModule
  ]
})
export class Module4Module { }
