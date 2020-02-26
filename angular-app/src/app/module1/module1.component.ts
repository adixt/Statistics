import { Component, OnInit } from '@angular/core';
import { AverageMeasures } from './module1.averagemeasures';
//
//
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

//
 
@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component implements OnInit {

  numbers: string;
  mean: Number = 0;
  data:any[];
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
    this.calculateArithmeticMean();
//





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
    var chart = worksheet.shapes().addChart(ChartType.ColumnClustered,
      worksheet.rows(0).cells(0), { x: 0, y: 0 },
      worksheet.rows(0).cells(12), { x: 100, y: 100 });

    chart.setSourceData("A2:M6", true);
    //Accessing a range of cells
    // worksheet.rows(0).cells(0).value = 1;
    // worksheet.rows(1).cells(0).value = 2;
    // worksheet.rows(2).cells(0).value = 3;
    var sumFormula = Formula.parse("=SUM(A1:A35)", CellReferenceMode.A1);
    sumFormula.applyTo(worksheet.rows(1).cells(1));
    var sum = worksheet.rows(1).cells(1).value;
    console.log('sum is ' + sum);
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
