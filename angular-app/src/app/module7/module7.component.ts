import { Component, OnInit } from '@angular/core';
declare var google: any;
declare var Plotly: any;

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
    const trace1 = {
      x: this.distribution1.map((val, idx) => idx),
      y: this.distribution1,
      mode: 'lines',
      name: 'Distribution A'
    };
    const trace2 = {
      x: this.distribution2.map((val, idx) => idx),
      y: this.distribution2,
      mode: 'lines',
      name: 'Distribution B'
    };
    const data = [trace1, trace2];
    const layout = {
      title: 'A & B distributions',
      plot_bgcolor: '#e9ecef',
      paper_bgcolor:"#e9ecef"
    };
    const config = {responsive: true}
    Plotly.newPlot(document.getElementById('plotlyChart'), data, layout, config);
  }

  ngOnInit() {
    this.distribution1 = Module7Component.normalArray(1000).sort();
    this.mean1 = Module7Component.mean(this.distribution1);
    this.stddev1 = Module7Component.stddev(this.distribution1);
    this.variation1 = Module7Component.variation(this.distribution1);
    this.distribution2 = Module7Component.normalArray(1000).sort();
    this.distribution2 = this.distribution2.map(val => val * this.multiplier);
    this.mean2 = Module7Component.mean(this.distribution2);
    this.stddev2 = Module7Component.stddev(this.distribution2);
    this.variation2 = Module7Component.variation(this.distribution2);
    // tslint:disable-next-line: object-literal-key-quotes
    this.drawDistributions();
  }
}
