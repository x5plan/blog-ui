import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components";
import DOMPurify from "dompurify";
import * as React from "react";

import { getRecaptchaEnabled } from "@/Features/Config/Selectors";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useAppSelector } from "@/Features/Store/Store";

import { format } from "../Utilities/Format";

export interface IRecaptchaCopyrightMessageProps {
    className?: string;
}

const useStyles = makeStyles({
    root: {},
    link: {
        color: tokens.colorBrandForegroundLink,
        ...shorthands.textDecoration("none"),
        ":hover": {
            color: tokens.colorBrandForegroundLinkHover,
            ...shorthands.textDecoration(
                "underline",
                "solid",
                tokens.colorBrandForegroundLinkHover,
                tokens.strokeWidthThin,
            ),
        },
        ":active": {
            color: tokens.colorBrandForegroundLinkPressed,
        },
    },
});

export const RecaptchaCopyrightMessage: React.FC<IRecaptchaCopyrightMessageProps> = (props) => {
    const { className } = props;

    const recaptchaEnabled = useAppSelector(getRecaptchaEnabled);
    const styles = useStyles();

    const [s_copyright, s_privacyPolicy, s_termsOfService] = useLocalizedStrings(
        CE_Strings.GOOGLE_RECAPTCHA_COPYRIGHT,
        CE_Strings.GOOGLE_RECAPTCHA_PRIVACY_POLICY,
        CE_Strings.GOOGLE_RECAPTCHA_TERMS_OF_SERVICE,
    );

    const html = React.useMemo(() => {
        const unsafeHtml = format(
            s_copyright,
            `<a class="${styles.link}" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">${s_privacyPolicy}</a>`,
            `<a class="${styles.link}" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">${s_termsOfService}</a>`,
        );

        return DOMPurify.sanitize(unsafeHtml, {
            ALLOWED_TAGS: ["a"],
            ALLOWED_ATTR: ["href", "target", "rel", "class"],
        });
    }, [s_copyright, s_privacyPolicy, s_termsOfService, styles.link]);

    return recaptchaEnabled ? (
        <span
            className={mergeClasses(styles.root, className)}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    ) : null;
};
