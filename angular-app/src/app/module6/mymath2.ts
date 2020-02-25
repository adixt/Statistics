import { generate } from 'rxjs';

export class MyMath{
    static sum(generatedNumbers: number[]): number {  
      let num = 0;
        for (let i = 0, l = generatedNumbers.length; i < l; i++) {
          num += generatedNumbers[i];
        }
        return num;
      }
      static Pearson(generatedNumbers:number[], generatedNumbers2:number[]):number{
        const mean = this.average(generatedNumbers);
        const mean2 = this.average(generatedNumbers2);
        let num = 0;
        let num2= 0;
        let num3= 0;
        let bottom = 0;
        for (let i = 0, l = generatedNumbers.length; i < l; i++) {
          num += (generatedNumbers[i] - mean) * (generatedNumbers2[i] - mean2);
          num2 +=((generatedNumbers[i] - mean)*(generatedNumbers[i] - mean));
          num3 +=((generatedNumbers2[i] - mean2)*(generatedNumbers2[i] - mean2));
        }
        let top = num / generatedNumbers.length;
        bottom = Math.sqrt(num2 / generatedNumbers.length) * Math.sqrt(num3 / generatedNumbers.length);
        return top/bottom;
      }
      static variance(variances:number[], variance:number[]): number{

          return ((this.sum(variances) * variance[0])/ variances.length);
      }

      static factorial(k: number): number{
        let f=1;
        for(let i= 1; i<=k; i++){
          f *= i;
        }
        return f;
      }
      static Poisson(lambda: number[], k: number[]): number{

        return (Math.pow(lambda[0],k[0])*(1/Math.exp(lambda[0])/this.factorial(k[0])))
      }
      

      static average(array: number[]){
        return this.sum(array) / array.length;
      }
    

    
}