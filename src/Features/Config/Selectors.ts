import type { IRootState } from "../Store/Types";

export const getAppName = (state: IRootState) => state.config.appName;
export const getRecaptchaEnabled = (state: IRootState) => state.config.recaptchaEnabled;
