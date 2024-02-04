import type { CE_Language } from "./Locales";

export { default as CE_Locale } from "./locale.strings";

export interface ILocaleState {
    lang: CE_Language;
    isRtl: boolean;
    strings: ILocalizedStrings;
}
