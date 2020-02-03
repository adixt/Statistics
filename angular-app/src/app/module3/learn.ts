export class Learn {

  static get Codes(): string {
    const value = `
static sum(array: number[]) {
  let num = 0;
  for (let i = 0, l = array.length; i < l; i++) {
    num += array[i];
  }
  return num;
}

static mean(array: number[]) {
  return this.sum(array) / array.length;
}

static meanSample(array: number[]) {
  return this.sum(array) / (array.length -1);
}

static variance(array: number[]) {
  const mean = this.mean(array);
  return this.mean(array.map((num) => {
    return Math.pow(num - mean, 2);
  }));
}

static varianceSample(array: number[]) {
  const mean = this.mean(array);
  return this.meanSample(array.map((num) => {
    return Math.pow(num - mean, 2);
  }));
}

static standardDeviation(array: number[]) {
  return Math.sqrt(MyMath.variance(array));
}

static standardDeviationSample(array: number[]) {
  return Math.sqrt(MyMath.varianceSample(array));
}

static meanAbsoluteDeviation(array: number[]) {
  const mean = MyMath.mean(array);
  return MyMath.mean(array.map((num) => {
    return Math.abs(num - mean);
  }));
}
`;
    return value;
  }
}
