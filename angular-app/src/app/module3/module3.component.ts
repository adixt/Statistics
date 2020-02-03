import { Component, OnInit } from '@angular/core';
import { MyMath } from './mymath';
import { Learn } from './learn';
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
  private numbersVarianceSample = 0;
  private numbersStandardDeviation = 0;
  private numbersStandardDeviationSample = 0;
  private numbersZIndexes = [];
  private numbersMeanAbsoluteDeviation = 0;

  get LearnCode(): string {
    const codes = Learn.Codes;
    return codes;
  }

  get ZIndexes(): number[] {
    return this.numbersZIndexes;
  }

  get ComputedVariance(): number {
    return this.numbersVariance;
  }
  get ComputedVarianceSample(): number {
    return this.numbersVarianceSample;
  }
  get StandardDeviation(): number {
    return this.numbersStandardDeviation;
  }
  get StandardDeviationSample(): number {
    return this.numbersStandardDeviationSample;
  }
  get MeanAbsoluteDeviation(): number {
    return this.numbersMeanAbsoluteDeviation;
  }
  get ShouldDisableSubmit(): boolean {
    return this.numbersToGenerate < 1 && this.generatedNumbers.length < 1;
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
  set ManuallyGeneratedNumbers(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.generatedNumbers = values;
    this.CalculateStatisticValues();
  }

  ngOnInit() {
    // tslint:disable-next-line: object-literal-key-quotes
    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(() => this.drawChart);
  }

  public generate() {
    const max = 10;
    const min = 1;
    this.generatedNumbers = Array.from({ length: this.numbersToGenerate },
      () => MyMath.randomIntFromInterval(min, max));

    this.CalculateStatisticValues();
  }

  CalculateStatisticValues() {
    this.numbersVariance = MyMath.variance(this.generatedNumbers);
    this.numbersVarianceSample = MyMath.varianceSample(this.generatedNumbers);
    this.numbersStandardDeviation = MyMath.standardDeviation(this.generatedNumbers);
    this.numbersStandardDeviationSample = MyMath.standardDeviationSample(this.generatedNumbers);
    this.numbersZIndexes = MyMath.zScores(this.generatedNumbers);
    this.numbersMeanAbsoluteDeviation = MyMath.meanAbsoluteDeviation(this.generatedNumbers);
    this.drawChart();
  }

  drawChart() {
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
      title: 'Normal distribution',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    const chart = new google.charts.Line(document.getElementById('googleChartHereVelocity'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}
