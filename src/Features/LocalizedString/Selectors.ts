import type { IRootState } from "@/Features/Store/Types";

export const getLanguage = (state: IRootState) => state.locale.lang;
export const getIsRtl = (state: IRootState) => state.locale.isRtl;
export const getStrings = (state: IRootState) => state.locale.strings;
