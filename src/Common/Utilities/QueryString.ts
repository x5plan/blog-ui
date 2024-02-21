import { isBoolean, isNumber, isString } from "../Validators/TypeCheckers";

export type IQueryObj = { [key: string]: string | number | boolean };

export function toQueryString(obj: IQueryObj): string {
    const param = new URLSearchParams();

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        const val = obj[key];

        if (isString(val)) {
            param.set(key, val);
        } else if (isNumber(val, { allowInfinity: false, allowNaN: false })) {
            param.set(key, val.toString(10));
        } else if (isBoolean(val)) {
            param.set(key, val ? "true" : "false");
        }
    }

    try {
        return param.toString().trim();
    } catch {
        return "";
    }
}
