import { isString } from "./TypeCheckers";

export function isPassword(value: unknown): value is string {
    return isString(value) && value.length >= 6 && value.length <= 32;
}
