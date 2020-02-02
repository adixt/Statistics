import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module3RoutingModule } from './module3-routing.module';
import { Module3Component } from './module3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Module3Component],
  imports: [
    CommonModule,
    Module3RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Module3Module { }
