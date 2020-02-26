import { Component, OnInit } from '@angular/core';
import { MyMath } from './mymath2';
import { Learn } from './learn';
declare var google: any;
@Component({
  selector: 'app-module6',
  templateUrl: './module6.component.html',
  styleUrls: ['./module6.component.scss']
})
export class Module6Component implements OnInit {

  constructor() { }
  private generatedNumbers: number[] = [];
  private generatedNumbers2: number[] = [];
  private generatedNumbers3: number[] = []; 
  private generatedNumbers4: number[] = [];
  private generatedNumbers5: number[] = [];
  private generatedNumbers6: number[] = [];
  private varianceInput = 0;
  private xx = 5;
  private Poisson = 0;
  private Variance = 0;

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
  set ManuallyGeneratedNumbers2(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.generatedNumbers2 = values;
    this.CalculateStatisticValues();
  }
  set ManuallyGeneratedNumbers3(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.generatedNumbers3 = values;
    this.CalculateStatisticValues();
  }
  set ManuallyGeneratedNumbers4(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.generatedNumbers4 = values;
    this.CalculateStatisticValues();
  }
  set ManuallyGeneratedNumbers5(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.generatedNumbers5 = values;
    this.CalculateStatisticValues();
  }
  set ManuallyGeneratedNumbers6(value: string) {
    const values = value
      .split(/[\s,\\n]+/)
      .filter((el) => {
        return el != null && el !== '';
      }).map((x) => {
        return parseFloat(x);
      });
    this.generatedNumbers6 = values;
    this.CalculateStatisticValues();
  }

  get PearsonRate(): number {
    return this.varianceInput;
  }
  get PoissonRate(): number {
    return this.Poisson;
  }
  get VarianceRate(): number {
    return this.Variance;
  }
  get LearnCode(): string {
    const codes = Learn.Codes;
    return codes;
  }



  ngOnInit() {
    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(() => this.drawChart);
  }
  CalculateStatisticValues(){
    //this.varianceInput = MyMath.Pearson(this.generatedNumbers, this.generatedNumbers2);
    this.varianceInput = MyMath.Pearson(this.generatedNumbers,this.generatedNumbers2);
    this.Poisson = MyMath.Poisson(this.generatedNumbers3,this.generatedNumbers4);
    this.Variance = MyMath.variance(this.generatedNumbers5,this.generatedNumbers6);
    this.drawChart();
  }
  drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'y');


    const first = this.generatedNumbers;
    const second = this.generatedNumbers2;

    let i=0;
    for(i=0; i<this.generatedNumbers.length;i++){
      data.addRow([this.generatedNumbers[i],this.generatedNumbers2[i]]);
    }

    const options = {
      title: 'Pearson Correlation Rate',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
    const chart = new google.charts.Line(document.getElementById('googleChartHereVelocity'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}
