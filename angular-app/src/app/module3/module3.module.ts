import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module3RoutingModule } from './module3-routing.module';
import { Module3Component } from './module3.component';


@NgModule({
  declarations: [Module3Component],
  imports: [
    CommonModule,
    Module3RoutingModule
  ]
})
export class Module3Module { }
