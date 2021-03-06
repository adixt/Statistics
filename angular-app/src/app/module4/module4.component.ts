import { Component, OnInit } from '@angular/core';
import { ShapiroWilk } from './shapiro-wilk';
import { Vector, Normality } from 'jerzy';
import { Statistics } from './stat';

declare var google: any;

@Component({
  selector: 'app-module4',
  templateUrl: './module4.component.html',
  styleUrls: ['./module4.component.scss']
})
export class Module4Component implements OnInit {
    stat: Statistics;
    skewness: Number = 0;
    kurtosis: Number = 0;
    mean: Number = 0;
    median: number = 0;
    mode: number = 0;

    sw: ShapiroWilk;
    numbers: string;
    numberList: number[];

    randomValuesCount: number = 1;
    distribution: string = "1";
    bias: number = 1;

    sampleSize: number = 30;
    sampleNumber: number = 50;

    constructor() {
        this.stat = new Statistics();
        this.sw = new ShapiroWilk();
    }

    ngOnInit() {
        google.charts.load('current', { 'packages': ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(() => this.drawSWHistogram);
    }

    generateRandomNumbers() {
        this.numbers = '';


        if (this.distribution === '1') {
            for (var i = 0; i < this.randomValuesCount; i++) {
                this.numbers += ((Math.random() - 0.5 + this.bias) + ' ');
                // this.numbers += (Math.floor(100*(Math.random() - 0.5) + this.bias)/100 + ' ');
            }
        } else if (this.distribution === '2') {
            for (var i = 0; i < this.randomValuesCount; i++) {
                this.numbers += ((Statistics.random_normal() + this.bias) + ' ');
                // this.numbers += ((Math.floor(100*Statistics.random_normal()) + this.bias)/100 + ' ');
            }
        }

        this.inputNumbers();
    }

    inputNumbers() {
        this.calculateAsymmetry();
        this.calculateSw();
        this.drawSWHistogram();
        this.drawSWColumn();
    }

    calculateAsymmetry(): void {
        var values = this.stringToFloatList(this.numbers);

        this.mean = Statistics.mean(values);
        this.median = Statistics.median(values);
        this.mode = Statistics.mode(values);
        this.skewness = Statistics.skewness(values);
        this.kurtosis = Statistics.kurtosis(values);
    }

    calculateSamplingDistributionForMean() {
        var distributionMeans = [];
        var distributionMedians = [];
        var numberListLen = this.numberList.length;
        var tmpElements;

        for (var k = 0; k < this.sampleNumber; k++) {
            tmpElements = [];

            for (var n = 0; n < this.sampleSize; n++) {
                tmpElements.push(this.numberList[Math.floor(Math.random() * numberListLen)]);
            }

            distributionMeans.push(['', Statistics.mean(tmpElements)]);
            distributionMedians.push(['', Statistics.median(tmpElements)]);
        }

        distributionMeans.unshift(['Value', 'Occ.']);
        distributionMedians.unshift(['Value', 'Occ.']);

        var chartMeans = new google.visualization.Histogram(document.getElementById('googleChartSampleMean'));

        chartMeans.draw(
            google.visualization.arrayToDataTable(distributionMeans),
            {
                title: 'Sampling distribution for the sample mean',
                legend: { position: 'none' },
            }
        );

        var chartMedians = new google.visualization.Histogram(document.getElementById('googleChartSampleMedian'));

        chartMedians.draw(
            google.visualization.arrayToDataTable(distributionMedians),
            {
                title: 'Sampling distribution for the sample median',
                legend: { position: 'none' },
            }
        );
    }

    calculateSw(): void {
        this.numberList = this.stringToFloatList(this.numbers);

        this.sw = Normality.shapiroWilk(new Vector(this.numberList));
        this.sw.p = Math.abs(this.sw.p);
    }

    stringToFloatList(str) {
        return str.split(/[\s,\\n]+/).filter(function (el) {
            return el != null && el != '';
        }).map(function (x) {
            return parseFloat(x);
        });
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
