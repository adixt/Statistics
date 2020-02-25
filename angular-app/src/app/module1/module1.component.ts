import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component implements OnInit {

  constructor() { }

  ngOnInit() {
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
