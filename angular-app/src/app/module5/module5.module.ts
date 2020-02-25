import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module5RoutingModule } from './module5-routing.module';
import { Module5Component } from './module5.component';

import {MathJaxModule} from 'ngx-mathjax';

@NgModule({
  declarations: [Module5Component],
  imports: [
    CommonModule,
    Module5RoutingModule,
    MathJaxModule.forChild()
  ]
})
export class Module5Module { }
