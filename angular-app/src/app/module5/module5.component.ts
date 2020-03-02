import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as CanvasJS from '../../assets/canvasjs.min';
import { gamma } from 'mathjs';

@Component({
  selector: 'app-module5',
  templateUrl: './module5.component.html',
  styleUrls: ['./module5.component.scss']
})
export class Module5Component implements OnInit {
  populationForm: FormGroup;
  experimentForm: FormGroup;
  resultsForm: FormGroup;
  tstudentForm: FormGroup;
  populationSigma: number;
  population: Array<number>;
  experiments: Array<number>;
  autoExperimentTimer = null;
  t1Chart: CanvasJS.Chart;
  t2Chart: CanvasJS.Chart;

  constructor(private formBuilder: FormBuilder) {
    this.populationForm = this.formBuilder.group({
      t1_N: 100000,
      t1_mu: 100,
      t1_sigma: 3
    });
    this.experimentForm = this.formBuilder.group({
      t1_n: 30
    });
    this.resultsForm = this.formBuilder.group({
      t1_nc: {'value': null, disabled: true},
      t1_muc: {'value': null, disabled: true},
      t1_mut: {'value': null, disabled: true},
      t1_sigmac: {'value': null, disabled: true},
      t1_sigmat: {'value': null, disabled: true},
      t1_sigmax: {'value': null, disabled: true}
    });
    this.tstudentForm = this.formBuilder.group({
      t2_nu: 1
    });
  }

  ngOnInit() {
    this.t1Chart = new CanvasJS.Chart("t1chart", {
      animationEnabled: false,
      theme: 'light2',
      data: [{
        type: "line",
        dataPoints: []
      }]
    });
    this.t1Chart.render();

    this.t2Chart = new CanvasJS.Chart("t2chart", {
      animationEnabled: false,
      theme: 'light2',
      data: []
    });
    this.t2Chart.render();
  }

  generateNewPopulation(N: number, mu: number, sigma: number) {
    this.populationSigma = sigma;
    this.population = new Array;
    this.experiments = new Array;

    for (let i = 0; i < N; ++i)
      this.population.push(this.randn(mu, sigma));

    this.resetExperiments();
  }

  generateNewExperiment(n: number) {
    let subjects = new Array;
    let mu = 0, sigma = 0;

    for (let i = 0; i < n; ++i) {
      let victim = this.population[Math.floor(Math.random() * this.population.length)];

      subjects.push(victim);
      mu += victim / n;
    }

    for (let i = 0; i < n; ++i)
      sigma += Math.pow(subjects[i] - mu, 2) / n;
    sigma = Math.sqrt(sigma);

    this.experiments.push(mu);

    let mut = 0, sigmat = 0;

    for (let i = 0; i < this.experiments.length; ++i)
      mut += this.experiments[i] / this.experiments.length;

    for (let i = 0; i < this.experiments.length; ++i)
      sigmat += Math.pow(this.experiments[i] - mut, 2) / this.experiments.length;
    sigmat = Math.sqrt(sigmat);

    this.resultsForm.controls.t1_nc.setValue(this.experiments.length);
    this.resultsForm.controls.t1_muc.setValue(mu);
    this.resultsForm.controls.t1_mut.setValue(mut);
    this.resultsForm.controls.t1_sigmac.setValue(sigma);
    this.resultsForm.controls.t1_sigmat.setValue(sigmat);
    this.resultsForm.controls.t1_sigmax.setValue(this.populationSigma / Math.sqrt(n));
    this.experimentForm.controls.t1_n.disable();
    this.t1Chart.options.data[0].dataPoints.push({x: this.experiments.length, y: sigmat});
    this.t1Chart.render();
  }

  startAutoMode() {
    this.experimentForm.controls.t1_n.disable();
    this.autoExperimentTimer = setInterval(() => this.generateNewExperiment(this.experimentForm.value.t1_n), 2)
  }

  stopAutoMode() {
    clearInterval(this.autoExperimentTimer);
    this.autoExperimentTimer = null;
  }

  resetExperiments() {
    this.experiments = new Array;

    this.resultsForm.controls.t1_nc.setValue(0);
    this.resultsForm.controls.t1_muc.setValue(null);
    this.resultsForm.controls.t1_mut.setValue(null);
    this.resultsForm.controls.t1_sigmac.setValue(null);
    this.resultsForm.controls.t1_sigmat.setValue(null);
    this.resultsForm.controls.t1_sigmax.setValue(null);
    this.experimentForm.controls.t1_n.enable();
    this.t1Chart.options.data[0].dataPoints = new Array;
    this.t1Chart.render();
  }

  generateNewTStudent(nu: number) {
    let data = []
    let ax = {
      type: "line",
      legendText: `nu = ${nu}`,
      showInLegend: true,
      dataPoints: data
    };

    let lov = 0.01;
    let dt = 0.05;

    for (let t = 0, v = 1; v >= lov; t += dt) {
      v = this.tstudent(t, nu);
      data.push({x: t, y: v});
    }

    for (let t = 0, v = 1; v >= lov; t -= dt) {
      v = this.tstudent(t, nu);
      data.push({x: t, y: v});
    }

    data.sort((a, b) => (a.x > b.x) ? 1 : -1);

    this.t2Chart.options.data.push(ax);
    this.t2Chart.render();
  }

  generateNewCleanTStudent(nu: number) {
    this.resetTStudent();
    this.generateNewTStudent(nu);
  }

  resetTStudent() {
    this.t2Chart.options.data = new Array;
    this.t2Chart.render();
  }

  randn(mu: number, sigma: number): number {
    let s, u, v, n;

    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    }
    while (s >= 1);

    n = u * Math.sqrt(-2 * Math.log(s) / s);

    return sigma * n + mu;
  }

  tstudent(t: number, nu: number): number {
    let a = <number>gamma((nu + 1) / 2) / (<number>gamma(nu / 2) * Math.sqrt(nu * Math.PI));
    let b = Math.pow(1 + (t * t) / nu, -(nu + 1) / 2);

    return a * b;
  }

}
