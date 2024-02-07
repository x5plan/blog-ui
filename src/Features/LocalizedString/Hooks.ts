import * as React from "react";

import { useAppSelector } from "@/Features/Store/Store";

import { getIsRtl, getStrings } from "./Selectors";
import type { CE_Strings } from "./Types";
import { getLocalizedString } from "./Utils";

export const useIsRtl = () => useAppSelector(getIsRtl);

export const useLocalizedString = <T extends CE_Strings>(key: T) => {
    const strings = useAppSelector(getStrings);

    return React.useMemo(() => getLocalizedString<T>(strings, key), [strings, key]);
};

export const useLocalizedStrings = <T extends CE_Strings[]>(...keys: T) => {
    const strings = useAppSelector(getStrings);

    return React.useMemo(
        () => keys.map((key) => getLocalizedString(strings, key)),
        [strings, keys],
    ) as unknown as {
        [K in keyof T]: ReturnType<typeof getLocalizedString<T[K]>>;
    };
};
