import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Module1RoutingModule } from './module1-routing.module';
import { Module1Component } from './module1.component';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';

import { IgxExcelModule } from 'igniteui-angular-excel';


@NgModule({
  declarations: [Module1Component],
  imports: [
    CommonModule,
    Module1RoutingModule,
    IgxExcelModule,
    IgxCategoryChartModule,
    FormsModule,
  ]
})
export class Module1Module { }
export class AppModule {}
