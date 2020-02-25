import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module2RoutingModule } from './module2-routing.module';
import { Module2Component } from './module2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Module2Component],
  imports: [
    CommonModule,
    Module2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Module2Module { }