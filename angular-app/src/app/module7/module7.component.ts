import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-module7',
  templateUrl: './module7.component.html',
  styleUrls: ['./module7.component.scss']
})
export class Module7Component implements OnInit {
  multiplier = 10;
  distribution1: number[];
  mean1: number;
  stddev1: number;
  variation1: number;
  distribution2: number[];
  mean2: number;
  stddev2: number;
  variation2: number;

  google: any;

  static mean(a: number[]): number {
    return a.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / a.length;
  }

  static stddev(a: number[]): number {
    const mean: number = this.mean(a);
    const result: number = a.reduce((accumulator, currentValue) => accumulator + (currentValue - mean) ** 2, 0);
    return Math.sqrt(result / a.length);
  }

  static variation(a: number[]): number {
    return this.stddev(a) / this.mean(a);
  }

  static random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static normal(): number {
    let u = 0;
    let v = 0;
    while (u === 0) { u = Math.random(); }
    while (v === 0) { v = Math.random(); }
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  static randomArray(min: number, max: number, len: number): number[] {
    return Array.from({ length: len }, () => this.random(min, max));
  }

  static normalArray(len: number): number[] {
    return Array.from({ length: len }, () => this.normal());
  }

  drawDistributions() {
    const data1 = this.google.visualization.DataTable();
    data1.addColumn('idx');
    data1.addColumn('number');
    data1.addRows(this.distribution1.map((val, idx) => [idx, val]))
    const chart1 = new this.google.visualization.LineChart(document.getElementById('googleChartA'));
    const options1 = {
      title: 'Próba A',
      legend: { position: 'none' },
    };
    chart1.draw(data1, options1);

    const data2 = this.google.visualization.DataTable();
    data1.addColumn('idx');
    data1.addColumn('number');
    data1.addRows(this.distribution2.map((val, idx) => [idx, val]))
    const chart2 = new this.google.visualization.LineChart(document.getElementById('googleChartB'));
    const options2 = {
      title: 'Próba B',
      legend: { position: 'none' },
    };
    chart2.draw(data2, options2);
  }

  constructor() {
    this.distribution1 = Module7Component.normalArray(1000).sort();
    this.mean1 = Module7Component.mean(this.distribution1);
    this.stddev1 = Module7Component.stddev(this.distribution1);
    this.variation1 = Module7Component.variation(this.distribution1);
    this.distribution2 = Module7Component.normalArray(1000).sort();
    this.distribution2 = this.distribution2.map(val => val * this.multiplier);
    this.mean2 = Module7Component.mean(this.distribution2);
    this.stddev2 = Module7Component.stddev(this.distribution2);
    this.variation2 = Module7Component.variation(this.distribution2);
  }

  ngOnInit() {
    this.google.charts.load('current', { packages: ['corechart'] });
    this.google.charts.setOnLoadCallback(() => this.drawDistributions);
    this.drawDistributions();
  }
}
