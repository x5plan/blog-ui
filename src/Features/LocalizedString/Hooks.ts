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

export function useLocalizedStrings<T extends Record<string, CE_Strings>>(
    keyMapObj: T,
): {
    [K in keyof T]: ReturnType<typeof getLocalizedString<T[K]>>;
};
export function useLocalizedStrings<T extends CE_Strings[]>(
    ...keys: T
): {
    [K in keyof T]: ReturnType<typeof getLocalizedString<T[K]>>;
};
export function useLocalizedStrings(...args: unknown[]) {
    const strings = useAppSelector(getStrings);

    return React.useMemo(() => {
        if (args.length === 1 && typeof args[0] === "object") {
            const keyMapObj = args[0] as Record<string, CE_Strings>;
            return Object.entries(keyMapObj).reduce(
                (acc, [key, value]) => ({ ...acc, [key]: getLocalizedString(strings, value) }),
                {},
            );
        } else {
            const keys = args as CE_Strings[];
            return keys.map((key) => getLocalizedString(strings, key));
        }
    }, [strings, args]);
}
