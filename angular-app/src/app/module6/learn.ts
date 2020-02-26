export class Learn {

  static get Codes(): string {
    const value = `
    static sum(Numbers: number[]): number {  
      let num = 0;
        for (let i = 0, l = Numbers.length; i < l; i++) {
          num += Numbers[i];
        }
        return num;
      }
      static Pearson(Numbers:number[], Numbers2:number[]):number{
        const mean = this.average(Numbers);
        const mean2 = this.average(Numbers2);
        let num = 0;
        let num2= 0;
        let num3= 0;
        let bottom = 0;
        for (let i = 0, l = Numbers.length; i < l; i++) {
          num += (Numbers[i] - mean) * (Numbers2[i] - mean2);
          num2 +=((Numbers[i] - mean)*(Numbers[i] - mean));
          num3 +=((Numbers2[i] - mean2)*(Numbers2[i] - mean2));
        }
        let top = num / Numbers.length;
        bottom = Math.sqrt(num2 / Numbers.length) * Math.sqrt(num3 / Numbers.length);
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
`;
    return value;
  }


  
}
