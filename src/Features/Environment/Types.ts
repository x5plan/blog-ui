import type { CE_Theme } from "../Theme/Types";

export interface IEnvState {
    apiEndPoint: string;
    cdnEndPoint: string;

    theme: CE_Theme;

    isAndroid: boolean;
    isIOS: boolean;

    isChrome: boolean;
    isEdge: boolean;
    isFirefox: boolean;
    isSafari: boolean;

    isMiddleScreen: boolean;
    isMiniScreen: boolean;
    isSmallScreen: boolean;

    isMobile: boolean;
    isMobileView: boolean;

    isRtl: boolean;

    isProduction: boolean;
}
