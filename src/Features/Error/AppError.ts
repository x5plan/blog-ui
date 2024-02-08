import type { CE_ErrorCode } from "./ErrorCode";

export class AppError extends Error {
    constructor(
        public readonly code: CE_ErrorCode,
        public readonly description?: string,
    ) {
        super(description || "App error");
        this.name = "AppError";
    }
}
