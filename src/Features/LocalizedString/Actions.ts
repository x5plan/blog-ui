import { createAction } from "@reduxjs/toolkit";

import type { IAppDispatch } from "@/Features/Store/Types";

import type { CE_Language } from "./Locales";
import type { ILocaleState } from "./Types";
import { getIsRtlLanguage, getPreferLanguage, loadLocaleAsync } from "./Utils";

const UPDATE_LOCALE = "Locale/Update";
export const setLocale = createAction(UPDATE_LOCALE, (props: Partial<ILocaleState>) => ({
    payload: props,
}));

export const updateLocaleAction = (lang: CE_Language) => async (dispatch: IAppDispatch) => {
    const isRtl = getIsRtlLanguage(lang);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    return dispatch(
        setLocale({
            lang,
            isRtl,
            strings: await loadLocaleAsync(lang),
        }),
    );
};

export const initLocalizedStringAction = async (dispatch: IAppDispatch) => {
    const preferLang = getPreferLanguage();
    return await dispatch(updateLocaleAction(preferLang));
};
