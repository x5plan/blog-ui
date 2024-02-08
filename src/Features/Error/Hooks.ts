import * as React from "react";

import { useLocalizedString, useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
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
        const [c_authErrorDescription] = strings;

        switch (code) {
            case CE_ErrorCode.AuthRequired:
                return c_authErrorDescription;

            default:
                return null;
        }
    }, [code, strings]);
};

export const useErrorPageLinks = (code: CE_ErrorCode) => {
    return React.useMemo<IErrorPageLink[]>(() => {
        switch (code) {
            default:
                return [];
        }
    }, [code]);
};
