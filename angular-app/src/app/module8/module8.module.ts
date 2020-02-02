import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module8RoutingModule } from './module8-routing.module';
import { Module8Component } from './module8.component';


@NgModule({
  declarations: [Module8Component],
  imports: [
    CommonModule,
    Module8RoutingModule
  ]
})
export class Module8Module { }
