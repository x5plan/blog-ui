import type { CE_RecaptchaActions } from "../Enums/RecaptchaActions";

export type IRecaptchaAsync = (action: CE_RecaptchaActions) => Promise<string>;
