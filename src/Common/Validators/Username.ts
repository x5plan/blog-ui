import { isString } from "./TypeCheckers";

/**
 * A username is a string of 3 ~ 24 ASCII characters,
 * and each character is a uppercase or lowercase letter or a number or any of '-_.#$'.
 */
export function isUsername(value: unknown): value is string {
    return isString(value) && /^[a-zA-Z0-9\-_.#$]{3,24}$/.test(value);
}
