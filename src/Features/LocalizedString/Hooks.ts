import { useAppSelector } from "@/Features/Store/Store";

import { getIsRtl, getLocalizedStrings } from "./Selectors";

export const useLocalizedStrings = () => useAppSelector(getLocalizedStrings);
export const useIsRtl = () => useAppSelector(getIsRtl);
