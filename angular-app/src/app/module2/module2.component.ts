import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Formulas } from './formulas';
import { Utils } from './utils';
import { isString } from 'util';

@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.scss']
})
export class Module2Component implements OnInit {
  medianForm: FormGroup;
  arithmeticForm: FormGroup;
  minimumSampleSizeForm: FormGroup;
  minimumSampleSizeFormAverage: FormGroup;
  SignificanceForm: FormGroup;
  SignificanceFormAverage: FormGroup;

  constructor() { }

  ngOnInit() {
    this.medianForm = new FormGroup({
      numbersToGenerateResults: new FormControl(null, Validators.required),
      generateMedian: new FormControl(null)
    });

    this.arithmeticForm = new FormGroup({
      numbersToGenerateResults: new FormControl(null, Validators.required),
      generateMedian: new FormControl(null),
      generateArithmeticAverage: new FormControl(null),
      generateMode: new FormControl(null)
    });

    this.minimumSampleSizeForm = new FormGroup({
      confidenceInterval: new FormControl(null, Validators.required),
      StdOfDistribution: new FormControl(null, Validators.required),
      maxError: new FormControl(null, Validators.required),
      generateMinimumSampleSize: new FormControl(null)
    });

    this.minimumSampleSizeFormAverage = new FormGroup({
      confidenceInterval: new FormControl(null, Validators.required),
      StdOfDistribution: new FormControl(null, Validators.required),
      maxError: new FormControl(null, Validators.required),
      SampleSize: new FormControl(null, Validators.required),
      generateMinimumSampleSizeAverage: new FormControl(null)
    });

    this.SignificanceForm = new FormGroup({
      confidenceInterval: new FormControl(null, Validators.required),
      StdOfDistribution: new FormControl(null, Validators.required),
      SampleSize: new FormControl(null, Validators.required),
      AverageValue: new FormControl(null, Validators.required),
      ExpectedValue: new FormControl(null, Validators.required),
      generateSignificance: new FormControl(null)
    });

    this.SignificanceFormAverage = new FormGroup({
      confidenceInterval: new FormControl(null, Validators.required),
      StdOfDistribution: new FormControl(null, Validators.required),
      SampleSize: new FormControl(null, Validators.required),
      AverageValue: new FormControl(null, Validators.required),
      ExpectedValue: new FormControl(null, Validators.required),
      generateSignificanceAverage: new FormControl(null)
    });



  }

  setMedianInput(inputValue:string, output:any) {
    let numbersToGenerateMedianArray: Array<number> = [],
        calculatedMedian: number = null;
    if (inputValue) {
        numbersToGenerateMedianArray = Utils.generateArrayFromCommaSeparatedString(inputValue);
        calculatedMedian = Formulas.calculateMedian(numbersToGenerateMedianArray);
        isNaN(calculatedMedian) ? output.setValue('data is incorrect') : output.setValue(calculatedMedian);
    }
  }

  setArithmeticInput(inputValue:string, output:any) {
    let numbersToGenerateArithmeticAverageArray: Array<number> = [],
        calculatedArithmeticAverage: number = null;
    if (inputValue) {
        numbersToGenerateArithmeticAverageArray = Utils.generateArrayFromCommaSeparatedString(inputValue);
        calculatedArithmeticAverage = Formulas.calculateArithmeticAverage(numbersToGenerateArithmeticAverageArray);
        isNaN(calculatedArithmeticAverage) ? output.setValue('data is incorrect') : output.setValue(calculatedArithmeticAverage);
    }
  }

  setModeInput(inputValue:string, output:any) {
    let numbersToGenerateModeArray: Array<number> = [],
        calculatedMode: number = null;
    if (inputValue) {
        numbersToGenerateModeArray = Utils.generateArrayFromCommaSeparatedString(inputValue);
        calculatedMode = Formulas.calculateMode(numbersToGenerateModeArray);
        isNaN(calculatedMode) ? output.setValue('data is incorrect') : output.setValue(calculatedMode);
    }
  }

  onMedianFormSubmit(): void {
    this.setMedianInput(this.medianForm.get('numbersToGenerateResults').value, this.medianForm.get('generateMedian'));   
  }

  onArithmeticFormSubmit(): void {
    this.setMedianInput(this.arithmeticForm.get('numbersToGenerateResults').value, this.arithmeticForm.get('generateMedian'));   
    this.setArithmeticInput(this.arithmeticForm.get('numbersToGenerateResults').value, this.arithmeticForm.get('generateArithmeticAverage'));
    this.setModeInput(this.arithmeticForm.get('numbersToGenerateResults').value, this.arithmeticForm.get('generateMode'));    
  }

  onminimumSampleSizeFormSubmit(): void {
    const confidenceIntervalInputValue:string = this.minimumSampleSizeForm.get('confidenceInterval').value,
          StdOfDistributionInputValue:string = this.minimumSampleSizeForm.get('StdOfDistribution').value,
          maxErrorInputValue:string = this.minimumSampleSizeForm.get('maxError').value;
    let generateMinimumSampleSizeINput = this.minimumSampleSizeForm.get('generateMinimumSampleSize');
    if (confidenceIntervalInputValue && StdOfDistributionInputValue && maxErrorInputValue) {
      let calculateSampleSize = Formulas.calculateMinimumSampleSize(parseFloat(confidenceIntervalInputValue), parseFloat(StdOfDistributionInputValue), parseFloat(maxErrorInputValue));
      isNaN(calculateSampleSize) ? generateMinimumSampleSizeINput.setValue('data is incorrect') : generateMinimumSampleSizeINput.setValue(calculateSampleSize);
    }

  }

  onminimumSampleSizeFormSubmitAverage(): void {
    const confidenceIntervalInputValue:string = this.minimumSampleSizeFormAverage.get('confidenceInterval').value,
          StdOfDistributionInputValue:string = this.minimumSampleSizeFormAverage.get('StdOfDistribution').value,
          SampleSize:string = this.minimumSampleSizeFormAverage.get('SampleSize').value,
          maxErrorInputValue:string = this.minimumSampleSizeFormAverage.get('maxError').value;
    let generateMinimumSampleSizeAverageINput = this.minimumSampleSizeFormAverage.get('generateMinimumSampleSizeAverage');
    if (confidenceIntervalInputValue && StdOfDistributionInputValue && maxErrorInputValue) {
      let calculateSampleSizeAverage = Formulas.calculateMinimumSampleSizeAverage(parseFloat(confidenceIntervalInputValue), parseInt(SampleSize), parseFloat(StdOfDistributionInputValue), parseFloat(maxErrorInputValue));
      isNaN(calculateSampleSizeAverage) ? generateMinimumSampleSizeAverageINput.setValue('data is incorrect') : generateMinimumSampleSizeAverageINput.setValue(calculateSampleSizeAverage);
    }

  }

  onCalculateSignificanceFormSubmit(): void {
    const confidenceIntervalInputValue:string = this.SignificanceForm.get('confidenceInterval').value,
          StdOfDistributionInputValue:string = this.SignificanceForm.get('StdOfDistribution').value,
          SampleSizeInputValue:string = this.SignificanceForm.get('SampleSize').value,
          AverageValueInputValue:string = this.SignificanceForm.get('AverageValue').value,
          ExpectedValueInputValue:string = this.SignificanceForm.get('ExpectedValue').value;

    let generateSignificanceINput = this.SignificanceForm.get('generateSignificance');
    if (confidenceIntervalInputValue && StdOfDistributionInputValue && SampleSizeInputValue && AverageValueInputValue && ExpectedValueInputValue) {
      let CalculateZValue = Formulas.calculateZValue(parseFloat(confidenceIntervalInputValue), parseFloat(StdOfDistributionInputValue), parseFloat(SampleSizeInputValue), parseFloat(AverageValueInputValue), parseFloat(ExpectedValueInputValue));
      const text = CalculateZValue ? 'Thesis should be accepted' : 'Thesis should be rejected';
      generateSignificanceINput.setValue(text);
    }

  }

  onCalculateSignificanceFormAverageSubmit(): void {
    const confidenceIntervalInputValue:string = this.SignificanceFormAverage.get('confidenceInterval').value,
          StdOfDistributionInputValue:string = this.SignificanceFormAverage.get('StdOfDistribution').value,
          SampleSizeInputValue:string = this.SignificanceFormAverage.get('SampleSize').value,
          AverageValueInputValue:string = this.SignificanceFormAverage.get('AverageValue').value,
          ExpectedValueInputValue:string = this.SignificanceFormAverage.get('ExpectedValue').value;

    let generateSignificanceAverageINput = this.SignificanceFormAverage.get('generateSignificanceAverage');
    if (confidenceIntervalInputValue && StdOfDistributionInputValue && SampleSizeInputValue && AverageValueInputValue && ExpectedValueInputValue) {
      let CalculateZValue = Formulas.calculateZValueAverage(parseFloat(confidenceIntervalInputValue), parseFloat(StdOfDistributionInputValue), parseFloat(SampleSizeInputValue), parseFloat(AverageValueInputValue), parseFloat(ExpectedValueInputValue));
      const text = CalculateZValue ? 'Thesis should be accepted' : 'Thesis should be rejected';
      generateSignificanceAverageINput.setValue(text);
    }

  }



  
}
