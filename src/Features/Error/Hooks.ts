import * as React from "react";

import { toQueryString } from "@/Common/Utilities/QueryString";
import { parseUrlToNavigate } from "@/Common/Utilities/SameOrigin";

import { useLocalizedString, useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { CE_PageBaseRoute } from "../Page/Types";
import { CE_ErrorCode } from "./ErrorCode";
import type { IErrorPageLink } from "./ErrorPage";

export const useErrorLocalizedTitle = (code: CE_ErrorCode) => {
    const stringCode = React.useMemo<CE_Strings>(() => {
        switch (code) {
            case CE_ErrorCode.AuthRequired:
                return CE_Strings.APP_ERROR_COMMON_AUTH_ERROR_TITLE;
            default:
                return CE_Strings.APP_ERROR_COMMON_UNKNOWN;
        }
    }, [code]);

    return useLocalizedString(stringCode);
};

export const useErrorCustomLocalizedDescription = (code: CE_ErrorCode) => {
    const strings = useLocalizedStrings(CE_Strings.APP_ERROR_COMMON_AUTH_ERROR_DESCRIPTION);

    return React.useMemo<string>(() => {
        const [s_authErrorDescription] = strings;

        switch (code) {
            case CE_ErrorCode.AuthRequired:
                return s_authErrorDescription;

            default:
                return null;
        }
    }, [code, strings]);
};

export const useErrorPageLinks = (code: CE_ErrorCode) => {
    const strings = useLocalizedStrings(CE_Strings.SIGN_IN_TITLE, CE_Strings.SIGN_UP_TITLE);

    return React.useMemo<IErrorPageLink[]>(() => {
        const [s_signInTitle, s_signUpTitle] = strings;

        switch (code) {
            case CE_ErrorCode.AuthRequired:
                return [
                    {
                        title: s_signInTitle,
                        href: `${CE_PageBaseRoute.SignIn}?${toQueryString({ redirect: parseUrlToNavigate(new URL(window.location.href)) })}`,
                    },
                    {
                        title: s_signUpTitle,
                        href: `${CE_PageBaseRoute.SignUp}${toQueryString({ redirect: parseUrlToNavigate(new URL(window.location.href)) })}`,
                    },
                ];

            default:
                return [];
        }
    }, [code, strings]);
};
