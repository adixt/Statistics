import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module2RoutingModule } from './module2-routing.module';
import { Module2Component } from './module2.component';


@NgModule({
  declarations: [Module2Component],
  imports: [
    CommonModule,
    Module2RoutingModule
  ]
})
export class Module2Module { }
