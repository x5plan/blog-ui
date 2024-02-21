import "@/assets/styles/recaptcha.css";

import * as React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { recaptchaLanguageMap } from "../../Features/LocalizedString/Locales";
import { getLanguage } from "../../Features/LocalizedString/Selectors";
import { useAppSelector } from "../../Features/Store/Store";

export interface IRecaptchaProviderProps {
    children: React.ReactElement;
}

export const RecaptchaProvider: React.FC<IRecaptchaProviderProps> = ({ children }) => {
    const recaptchaEnabled = useAppSelector((state) => state.config.recaptchaEnabled);
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