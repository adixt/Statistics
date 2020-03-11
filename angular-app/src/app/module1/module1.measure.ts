import { numberToString } from 'igniteui-angular-core';

export class AverageMeasures {
    static mean(arr: number[]): number {
        return arr.reduce((a,b) => a + b, 0) / arr.length;
    }

    static median(arr: number[]) {
        arr.sort();

        return arr.length % 2 ? (arr[arr.length/2 - 0.5] + arr[arr.length/2 + 0.5]) / 2 : arr[arr.length/2];
    }

    static harmean(arr: number[]): number {

        // var sum = 0;
        // var i;
        // for(i=0;i<arr.length;i++){
        //     sum = sum + 1+arr[i];
        // return arr.length/sum;
        // } 
        
      //  return arr.reduce((a,b) => ((Math.sqrt(a*b)) * (Math.sqrt(a*b))) / ((a + b)/2)); 
     // return arr.reduce((a,b) => Math.pow(a+b, 1.0 / arr.length)); 

     var sum = arr.reduce((a,b) => (arr.length / (1/a + 1/b)));
     console.log(arr.length + 'length');
     return sum;
    }

    static geometric(arr: number[]): number{
      var i;

      var sum=arr.reduce((a,b) => a*b);

      for(i=0; i<arr.length-2; i++){
        sum = Math.sqrt(sum);
      }
      return sum;
    }

    static mode1(arr: number[]) {
        var counts = {};

        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] in counts)) {
                counts[arr[i]] = 0;
            }

            counts[arr[i]]++;
        }

        var maxCountKey = '';

        for (var key in counts) {
            var value = counts[key];

            if (!counts[maxCountKey] || value > counts[maxCountKey]) {
                maxCountKey = key;
            }
        }

        return parseFloat(maxCountKey);
    }

    static mode(arr: number[], max) {


        var counts = {};

        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] in counts)) {
                counts[arr[i]] = 0;
            }

            counts[arr[i]]++;
        }

        var maxCountKey = '';

        for (var key in counts) {
            var value = counts[key];

            if (!counts[maxCountKey] || value > counts[maxCountKey]) {
                maxCountKey = key;
            }
        }

        return parseFloat(maxCountKey);
    }


    static Median(arr: number[]) {
        return this.Quartile_50(arr);
      }
      
      static Quartile_25(arr: number[]) {
        return this.Quartile(arr, 0.25);
      }
      
      static Quartile_50(arr: number[]) {
        return this.Quartile(arr, 0.5);
      }
      
      static Quartile_75(arr: number[]) {
        return this.Quartile(arr, 0.75);
      }
      
      static Quartile(arr: number[], q) {
        arr=arr.sort(function(a, b) {
            return a - b;
          });
        var pos = ((arr.length) - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;
        if( (arr[base+1]!==undefined) ) {
          return arr[base] + rest * (arr[base+1] - arr[base]);
        } else {
          return arr[base];
        }
      }
      
      static Array_Sort_Numbers(arr){
        return arr.sort(function(a, b) {
          return a - b;
        });
      }
      
      static Array_Sum(arr){
         return arr.reduce(function(a, b) { return a + b; }, 0); 
      }
      
      static Array_Average(arr: number[]) {
        return arr.reduce(function(a, b) { return a + b; }, 0) / arr.length;
      }
      
      static Array_Stdev(tab){
         var i,j,total = 0, mean = 0, diffSqredArr = [];
         for(i=0;i<tab.length;i+=1){
             total+=tab[i];
         }
         mean = total/tab.length;
         for(j=0;j<tab.length;j+=1){
             diffSqredArr.push(Math.pow((tab[j]-mean),2));
         }
         return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
                  return firstEl + nextEl;
                })/tab.length));  
      }

}