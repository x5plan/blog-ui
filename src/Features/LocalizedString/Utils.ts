import { CE_Language, defaultLanguage, rtlLanguages, supportedLanguages } from "./Locales";

export function getIsRtlLanguage(lang: CE_Language) {
    return rtlLanguages.findIndex((l) => lang.startsWith(l)) >= 0;
}

export function selectLanguage(languages: string | string[]): CE_Language {
    if (!languages) return null;

    if (typeof languages === "string") languages = [languages];
    languages = languages.map((lang) => lang.trim().toLowerCase());

    // Strict match
    for (const language of languages) {
        const lang = supportedLanguages.find((value) => value === language);
        if (lang) return lang;
    }

    // Match prefix
    for (const language of languages) {
        const lang = supportedLanguages.find((value) => value === language.split("-")[0]);
        if (lang) return lang;
    }

    return null;
}

export function getNavigatorLanguage() {
    return selectLanguage(Array.from(navigator?.languages));
}

export function getPreferLanguage() {
    return getNavigatorLanguage() || defaultLanguage;
}

export async function loadLocaleAsync(lang: CE_Language) {
    const module = await import(`../../assets/locale/${lang}.js`);
    return module.default as ILocalizedStrings;
}
