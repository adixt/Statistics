import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module1RoutingModule } from './module1-routing.module';
import { Module1Component } from './module1.component';


@NgModule({
  declarations: [Module1Component],
  imports: [
    CommonModule,
    Module1RoutingModule
  ]
})
export class Module1Module { }
