export function isBoolean(value: unknown): value is boolean {
    return value instanceof Boolean || typeof value === "boolean";
}
