import { Component, OnInit } from '@angular/core';
import { AverageMeasures } from './module1.averagemeasures';

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component implements OnInit {

  numbers: string;
  mean: Number = 0;

  constructor() { }

  ngOnInit() {
  }

  inputNumbers() {
    this.calculateArithmeticMean();
  }

  stringToFloatList(str) {
    return str.split(/[\s,\\n]+/).filter(function (el) {
        return el != null && el != '';
    }).map(function (x) {
        return parseFloat(x);
    });
  }
  
  calculateArithmeticMean(): void {
    var values = this.stringToFloatList(this.numbers);

    this.mean = AverageMeasures.mean(values);
  } 

  /*set ManuallyGeneratedNumbers(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.CalculateStatisticValues();
  }

  CalculateStatisticValues() {
   
  }*/

}
