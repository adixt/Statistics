import { Component, OnInit } from '@angular/core';
import { AverageMeasures } from './module1.measure';

import { Workbook } from "igniteui-angular-excel";
import { WorkbookFormat } from "igniteui-angular-excel";
import { Worksheet } from "igniteui-angular-excel";
import { WorksheetTable } from "igniteui-angular-excel";
import { NamedReference } from "igniteui-angular-excel";
import { WorksheetCellComment } from "igniteui-angular-excel";
import { FormattedString } from "igniteui-angular-excel";
import { Formula } from "igniteui-angular-excel";
import { CellReferenceMode } from "igniteui-angular-excel";
import { WorksheetChart } from "igniteui-angular-excel";
import { ChartType } from "igniteui-angular-excel";

 
@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component implements OnInit {

  numbers: string;
  mean: Number = 0;
  harmean: Number = 0;
  geomean: Number = 0;
  modesngl: Number = 0;
  quartile: Number = 0;
  max: Number = 0;
  dominanta: Number = 0;
  data:any[];
  Quartile_50: Number = 0;
  Quartile_25: Number = 0;
  Quartile_75: Number = 0;
  Median: Number = 0;
  Array_Sort_Numbers: string;
  Array_Stdev: Number = 0;
  confidenceNorm: Number = 0;
  alfa: string;
  rozmiar: string;
  odchylenieStandardowe: string;
  confidenceT: Number = 0;
  quartileexc: Number = 0;
  quartileinc: Number = 0;
  constructor() { }

  ngOnInit() {
    this.data = [
      { "CountryName": "China", "Pop1995": 1216, "Pop2005": 1297, "Pop2015": 1361, "Pop2025": 1394 },
      { "CountryName": "India", "Pop1995": 920, "Pop2005": 1090, "Pop2015": 1251, "Pop2025": 1396 },
      { "CountryName": "United States", "Pop1995": 266, "Pop2005": 295, "Pop2015": 322, "Pop2025": 351 },
      { "CountryName": "Indonesia", "Pop1995": 197, "Pop2005": 229, "Pop2015": 256, "Pop2025": 277 },
      { "CountryName": "Brazil", "Pop1995": 161, "Pop2005": 186, "Pop2015": 204, "Pop2025": 218 }
     ];
  }

  inputNumbers() {
    this.calculateArithmeticHarmean();
    this.calculateArithmeticGeometric();
    this.calculateArithmeticArray_Stdev();
    this.calculateArithmeticArray_Sort_Numbers();
    this.calculateArithmeticQuartile_75();
    this.calculateArithmeticQuartile_50();
    this.calculateArithmeticQuartile_25();
    this.calculateArithmeticMedian();

    var workbook = new Workbook();
    var worksheet = workbook.worksheets().add("Sheet1");
    
    //Accessing a single cell
    var values = this.stringToFloatList(this.numbers);
    var counter=0;
    values.forEach(element => {
      worksheet.rows(counter).cells(0).value = element;
      counter++;
    });
    this.data=values;
    ///var chart = worksheet.shapes().addChart(ChartType.ColumnClustered,
    ///  worksheet.rows(0).cells(0), { x: 0, y: 0 },
    ///  worksheet.rows(0).cells(12), { x: 100, y: 100 });

    ///chart.setSourceData("A2:M6", true);
    //Accessing a range of cells
    // worksheet.rows(0).cells(0).value = 1;
    // worksheet.rows(1).cells(0).value = 2;
    // worksheet.rows(2).cells(0).value = 3;
    var sumFormula = Formula.parse("=SUM(A1:A35)", CellReferenceMode.A1);
    sumFormula.applyTo(worksheet.rows(1).cells(1));
    var sum = worksheet.rows(1).cells(1).value;
    console.log('SUM is ' + sum);

    var averageFormula = Formula.parse("=AVERAGE(A1:A55)", CellReferenceMode.A1);
    averageFormula.applyTo(worksheet.rows(1).cells(1));
    this.mean = worksheet.rows(1).cells(1).value;
    console.log('AVG is ' + this.mean);

    var maxFormula = Formula.parse("=MAX(A1:A55)", CellReferenceMode.A1);
    maxFormula.applyTo(worksheet.rows(1).cells(1));
    this.max = worksheet.rows(1).cells(1).value;
    console.log('Harmean is ' + this.max);

    /*var harmeanFormula = Formula.parse("=HARMEAN(A1:A55)", CellReferenceMode.A1);
    harmeanFormula.applyTo(worksheet.rows(1).cells(1));
    this.harmean = worksheet.rows(1).cells(1).value;
    console.log('Harmean is ' + this.harmean);

    var geomeanFormula = Formula.parse("=GEOMEAN(A1:A55)", CellReferenceMode.A1);
    geomeanFormula.applyTo(worksheet.rows(1).cells(1));
    this.geomean = worksheet.rows(1).cells(1).value;
    console.log('GEOMEAN is ' + this.geomean);

    var modeSynglFormula = Formula.parse("=MODE.SNGL(A1:A55)", CellReferenceMode.A1);
    modeSynglFormula.applyTo(worksheet.rows(1).cells(1));
    this.modesngl = worksheet.rows(1).cells(1).value;
    console.log('MODE.SNGL is ' + this.modesngl);

    var quartileFormula = Formula.parse("=QUARTILE(A1:A55)", CellReferenceMode.A1);
    quartileFormula.applyTo(worksheet.rows(1).cells(1));
    this.quartile = worksheet.rows(1).cells(1).value;
    console.log('QUARTILE is ' + this.quartile);*/

    var confidenceFormula = Formula.parse("=_xlfn.CONFIDENCE.NORM("+this.alfa+";"+this.odchylenieStandardowe+";"+this.rozmiar+"A1:A55)", CellReferenceMode.A1);
    confidenceFormula.applyTo(worksheet.rows(1).cells(1));
    this.confidenceNorm = worksheet.rows(1).cells(1).value;
    console.log('CONFIDENCE is ' + this.confidenceNorm);

    
    var confidenceFormula = Formula.parse("=CONFIDENCE.NORM("+this.alfa+";"+this.odchylenieStandardowe+";"+this.rozmiar+"A1:A55)", CellReferenceMode.A1);
    confidenceFormula.applyTo(worksheet.rows(1).cells(1));
    this.confidenceNorm = worksheet.rows(1).cells(1).value;
    console.log('CONFIDENCE2 is ' + this.confidenceNorm);

    var confidenceTFormula = Formula.parse("=_xlfn.CONFIDENCE.T("+this.alfa+";"+this.odchylenieStandardowe+";"+this.rozmiar+"A1:A55)", CellReferenceMode.A1);
    confidenceTFormula.applyTo(worksheet.rows(1).cells(1));
    this.confidenceT = worksheet.rows(1).cells(1).value;
    console.log('CONFIDENCE T is ' + this.confidenceT);

    var quartileFormula = Formula.parse("=xlfn.QUARTILE.EXC("+this.alfa+";"+this.odchylenieStandardowe+";"+this.rozmiar+"A1:A55)", CellReferenceMode.A1);
    quartileFormula.applyTo(worksheet.rows(1).cells(1));
    this.quartileexc = worksheet.rows(1).cells(1).value;
    console.log('CONFIDENCE is ' + this.quartileexc);

    var quartileIncFormula = Formula.parse("=_xlfn.QUARTILE.INC("+this.alfa+";"+this.odchylenieStandardowe+";"+this.rozmiar+"A1:A55)", CellReferenceMode.A1);
    quartileIncFormula.applyTo(worksheet.rows(1).cells(1));
    this.quartileinc = worksheet.rows(1).cells(1).value;
    console.log('CONFIDENCE is ' + this.quartileinc);
  }

  stringToFloatList(str) {
    return str.split(/[\s,\\n]+/).filter(function (el) {
        return el != null && el != '';
    }).map(function (x) {
        return parseFloat(x);
    });
  }

  calculateArithmeticHarmean(): void {
    var values = this.stringToFloatList(this.numbers);
    this.harmean = AverageMeasures.harmean(values);
    //this.mean = AverageMeasures.mean(values);
  } 

  calculateArithmeticGeometric(): void {
    var values = this.stringToFloatList(this.numbers);
    this.geomean = AverageMeasures.geometric(values);
  } 

  calculateArithmeticDominanta(): void {
    var values = this.stringToFloatList(this.numbers);
    this.dominanta = AverageMeasures.mode(values, this.max);
  } 

  calculateArithmeticMedian(): void {
    var values = this.stringToFloatList(this.numbers);
    this.Median = AverageMeasures.median(values);
  } 

  calculateArithmeticQuartile_25(): void {
    var values = this.stringToFloatList(this.numbers);
    this.Quartile_25 = AverageMeasures.Quartile_25(values);
  } 

  calculateArithmeticQuartile_50(): void {
    var values = this.stringToFloatList(this.numbers);
    this.Quartile_50 = AverageMeasures.Quartile_50(values);
  } 

  calculateArithmeticQuartile_75(): void {
    var values = this.stringToFloatList(this.numbers);
    this.Quartile_75 = AverageMeasures.Quartile_75(values);
  } 

  calculateArithmeticArray_Sort_Numbers(): void {
    var values = this.stringToFloatList(this.numbers);
    this.Array_Sort_Numbers = AverageMeasures.Array_Sort_Numbers(values);
  } 

  calculateArithmeticArray_Stdev(): void {
    var values = this.stringToFloatList(this.numbers);
    this.Array_Stdev = AverageMeasures.Array_Stdev(values);
  } 

}
