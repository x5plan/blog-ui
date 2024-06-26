import "@/assets/styles/recaptcha.css";

import * as React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3-safe";

import { getRecaptchaEnabled } from "@/Features/Config/Selectors";

import { recaptchaLanguageMap } from "../../Features/LocalizedString/Locales";
import { getLanguage } from "../../Features/LocalizedString/Selectors";
import { useAppSelector } from "../../Features/Store/Store";

export const RecaptchaProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const recaptchaEnabled = useAppSelector(getRecaptchaEnabled);
    const useRecaptchaNet = useAppSelector((state) => state.config.useRecaptchaNet);
    const recaptchaSiteKey = useAppSelector((state) => state.config.recaptchaSiteKey);
    const language = useAppSelector(getLanguage);

    return recaptchaEnabled ? (
        <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaSiteKey}
            useRecaptchaNet={useRecaptchaNet}
            language={recaptchaLanguageMap[language]}
        >
            {children}
        </GoogleReCaptchaProvider>
    ) : (
        children
    );
};
