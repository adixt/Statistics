export class AverageMeasures {
    static mean(arr: number[]): number {
        return arr.reduce((a,b) => a + b, 0) / arr.length;
    }

}