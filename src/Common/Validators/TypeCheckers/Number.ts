export interface IIsNumberOptions {
    allowNaN?: boolean;
    allowInfinity?: boolean;
    maxDecimalPlaces?: number;
}

export function isNumber(value: unknown, options: IIsNumberOptions = {}): value is number {
    if (typeof value !== "number") {
        return false;
    }

    if (value === Infinity || value === -Infinity) {
        return !!options.allowInfinity;
    }

    if (Number.isNaN(value)) {
        return !!options.allowNaN;
    }

    if (options.maxDecimalPlaces !== undefined) {
        let decimalPlaces = 0;
        if (value % 1 !== 0) {
            decimalPlaces = value.toString().split(".")[1].length;
        }
        if (decimalPlaces > options.maxDecimalPlaces) {
            return false;
        }
    }

    return Number.isFinite(value);
}
