export class Utils {
    static generateArrayFromCommaSeparatedString(value: string) {
        return value.toString().split(',').map(Number);
    }
}