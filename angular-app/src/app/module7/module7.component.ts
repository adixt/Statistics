import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-module7',
  templateUrl: './module7.component.html',
  styleUrls: ['./module7.component.scss']
})
export class Module7Component implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
