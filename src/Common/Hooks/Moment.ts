import moment, { type MomentInput } from "moment/min/moment-with-locales";
import * as React from "react";

import { getLanguage } from "@/Features/LocalizedString/Selectors";
import { useAppSelector } from "@/Features/Store/Store";

export const useMomentFormatter = () => {
    const lang = useAppSelector(getLanguage);

    return React.useCallback(
        (inp: MomentInput, format = "llll") => moment(inp).locale(lang).format(format),
        [lang],
    );
};
