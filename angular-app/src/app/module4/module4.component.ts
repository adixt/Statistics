import { Component, OnInit } from '@angular/core';
import { ShapiroWilk } from './shapiro-wilk';
import { Vector, Normality } from 'jerzy';

declare var google: any;

@Component({
  selector: 'app-module4',
  templateUrl: './module4.component.html',
  styleUrls: ['./module4.component.scss']
})
export class Module4Component implements OnInit {
    sw: ShapiroWilk;
    numbers: string;
    numberList: number[];

    constructor() {
        this.sw = new ShapiroWilk();
    }

    ngOnInit() {
        google.charts.load('current', { 'packages': ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(() => this.drawSWHistogram);
    }

    calculateSw(): void {
        this.numberList = this.numbers.split(/[\s,\\n]+/).filter(function (el) {
            return el != null && el != '';
        }).map(function (x) {
            return parseFloat(x);
        });

        this.sw = Normality.shapiroWilk(new Vector(this.numberList))
    }

    drawSWHistogram() {
        var result = [];

        for (var i = 0; i < this.numberList.length; i++) {
            result.push(['', this.numberList[i]]);
        }

        result.unshift(['Value', 'Occ.']);

        var data = google.visualization.arrayToDataTable(result);

        var chart = new google.visualization.Histogram(document.getElementById('googleChartSWHistogram'));

        var options = {
            title: 'Histogram',
            legend: { position: 'none' },
        };

        chart.draw(data, options);
    }

    drawSWColumn() {
        var res = {};
        for (var i = 0; i < this.numberList.length; i++) {
            if (!res[this.numberList[i]]) {
                res[this.numberList[i]] = 1;
            }
        }

        var result = Object.keys(res).map(function (key) {
            return [Number(key), res[key]];
        });

        result.unshift(['Value', 'Occ.']);

        var data = google.visualization.arrayToDataTable(result);

        var chart = new google.visualization.ColumnChart(document.getElementById('googleChartSWColumn'));

        var options = {
            title: 'Column',
            legend: { position: 'none' },
        };

        chart.draw(data, options);
    }
}
