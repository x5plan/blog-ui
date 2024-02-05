import * as React from "react";

import { useAppSelector } from "@/Features/Store/Store";

import { getIsRtl, getStrings } from "./Selectors";
import type { CE_Strings } from "./Types";
import { getLocalizedString } from "./Utils";

export const useIsRtl = () => useAppSelector(getIsRtl);

export const useLocalizedString = (key: CE_Strings) => {
    const strings = useAppSelector(getStrings);

    return React.useMemo(() => getLocalizedString(strings, key), [strings, key]);
};

export const useLocalizedStrings = (...keys: CE_Strings[]) => {
    const strings = useAppSelector(getStrings);

    return React.useMemo(
        () => keys.map((key) => getLocalizedString(strings, key)),
        [strings, keys],
    );
};
