export class MyMath {
  static median(array: number[]) {
    array.sort((a, b) => {
      return a - b;
    });
    const mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
  }

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

  static variance(array: number[]) {
    const mean = this.mean(array);
    return this.mean(array.map((num) => {
      return Math.pow(num - mean, 2);
    }));
  }

  static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static standardDeviation(array: number[]) {
    return Math.sqrt(MyMath.variance(array));
  }

  static zScores(array: number[]) {
    const mean = MyMath.mean(array);
    const standardDeviation = MyMath.standardDeviation(array);
    return array.map((num) => {
      return (num - mean) / standardDeviation;
    });
  }

  static normalDistribution(value: number, mean: number, standardDeviation: number) {
    let nv = 1.0 / (Math.sqrt(2.0 * Math.PI) * standardDeviation);
    const z = (value - mean) / standardDeviation;
    nv *= Math.exp(-0.5 * z * z);
    return nv;
  }

}
