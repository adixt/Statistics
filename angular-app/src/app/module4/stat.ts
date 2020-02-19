export class Statistics {
    static mean(arr: number[]): number {
        return arr.reduce((a,b) => a + b, 0) / arr.length;
    }

    static median(arr: number[]) {
        arr.sort();

        return arr.length % 2 ? (arr[arr.length/2 - 0.5] + arr[arr.length/2 + 0.5]) / 2 : arr[arr.length/2];
    }

    static mode(arr: number[]) {
        // Not working
        var counts = [];

        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] in counts)) {
                counts[arr[i]] = 0;
            }

            counts[arr[i]]++;
        }

        console.log(counts.sort());

        // return Object.keys(arr).find(key => arr[key] === );

        return arr.filter(function(a){return a}).sort();
    }

    static moment(arr: number[], degree: number) {
        var moment = 0;

        for (var i = 0; i < arr.length; i++) {
            moment += (arr[i] - this.mean(arr))**degree;
        }

        moment /= arr.length;

        return moment;
    }

    static skewness(arr: number[]) {
        return this.moment(arr, 3) / this.std(arr)**3;
    }

    static kurtosis(arr: number[]) {
        return this.moment(arr, 4) / this.std(arr)**4;
    }

    static std(arr: number[]) {
        var std = 0;

        for (var i = 0; i < arr.length; i++) {
            std += (arr[i] - this.mean(arr))**2;
        }

        std = Math.sqrt(std / arr.length);

        return std;
    }

    static random_normal() {
        var u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    }
}