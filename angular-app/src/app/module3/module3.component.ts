import { Component, OnInit } from '@angular/core';
import { MyMath } from './mymath';
declare var google: any;
@Component({
  selector: 'app-module3',
  templateUrl: './module3.component.html',
  styleUrls: ['./module3.component.scss']
})
export class Module3Component implements OnInit {

  constructor() { }

  private numbersToGenerate = 0;
  private generatedNumbers = [];
  private numbersVariance = 0;
  private numbersStandardDeviation = 0;
  private numbersZIndexes = [];

  get ZIndexes(): number[] {
    return this.numbersZIndexes;
  }

  get ComputedVariance(): number {
    return this.numbersStandardDeviation;
  }
  get StandardDeviation(): number {
    return this.numbersVariance;
  }
  get ShouldDisableSubmit(): boolean {
    return this.numbersToGenerate < 1;
  }
  get NumbersToGenerate(): number {
    return this.numbersToGenerate;
  }
  set NumbersToGenerate(value: number) {
    this.numbersToGenerate = value;
  }
  get GeneratedNumbers(): number[] {
    return this.generatedNumbers;
  }

  ngOnInit() {
    // tslint:disable-next-line: object-literal-key-quotes
    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(() => this.drawChartVelocity);

  }


  public generate() {
    const max = 10;
    const min = 1;
    this.generatedNumbers = Array.from({ length: this.numbersToGenerate },
      () => MyMath.randomIntFromInterval(min, max));

    this.numbersVariance = MyMath.variance(this.generatedNumbers);
    this.numbersStandardDeviation = MyMath.standardDeviation(this.generatedNumbers);
    this.numbersZIndexes = MyMath.zScores(this.generatedNumbers);
  }

  drawChartVelocity() {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'VALUE');
    data.addColumn('number', 'NORMAL DISTRIBUTION');


    const sortedValues = this.generatedNumbers.sort((a, b) => a - b);
    const sortedMEad = MyMath.mean(sortedValues);
    const output = sortedValues.map((value) => {
      return [value, MyMath.normalDistribution(value, sortedMEad, this.StandardDeviation)];
    });

    data.addRows(output);

    const options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    const chart = new google.charts.Line(document.getElementById('googleChartHereVelocity'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}
