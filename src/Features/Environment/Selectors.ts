import type { IRootState } from "@/Features/Store/Types";

export const getEnv = (state: IRootState) => state.env;

export const getApiBearerToken = (state: IRootState) => state.env.apiBearerToken;
export const getApiEndPoint = (state: IRootState) => state.env.apiEndPoint;

export const getTheme = (state: IRootState) => state.env.theme;

export const getIsAndroid = (state: IRootState) => state.env.isAndroid;
export const getIsIOS = (state: IRootState) => state.env.isIOS;

export const getIsChrome = (state: IRootState) => state.env.isChrome;
export const getIsEdge = (state: IRootState) => state.env.isEdge;
export const getIsFirefox = (state: IRootState) => state.env.isFirefox;
export const getIsSafari = (state: IRootState) => state.env.isSafari;

export const getIsSmallScreen = (state: IRootState) => state.env.isSmallScreen;
export const getIsMiniScreen = (state: IRootState) => state.env.isMiniScreen;
export const getIsMiddleScreen = (state: IRootState) => state.env.isMiddleScreen;

export const getIsMobile = (state: IRootState) => state.env.isMobile;
export const getIsMobileView = (state: IRootState) => state.env.isMobileView;

export const getIsRtl = (state: IRootState) => state.env.isRtl;
