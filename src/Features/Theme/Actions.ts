import { addEventListenerToMatchMedia } from "@/Common/Utilities/MatchMedia";

import { setEnvAction } from "../Environment/Actions";
import type { IAppDispatch } from "../Store/Types";
import { CE_Theme } from "./Types";

export const initThemeAction = (dispatch: IAppDispatch) => {
    if (window.matchMedia) {
        const forcedColorsMatch = window.matchMedia("(forced-colors: active)");
        const prefersDarkColorSchemeMatch = window.matchMedia("(prefers-color-scheme: dark)");

        const updateTheme = () => {
            const isDarkMode = prefersDarkColorSchemeMatch.matches;
            const isForcedColors = forcedColorsMatch.matches;

            if (isForcedColors) {
                dispatch(setEnvAction({ theme: CE_Theme.HighContrast }));
            } else if (isDarkMode) {
                dispatch(setEnvAction({ theme: CE_Theme.Dark }));
            } else {
                dispatch(setEnvAction({ theme: CE_Theme.Light }));
            }
        };

        updateTheme();

        addEventListenerToMatchMedia(forcedColorsMatch, updateTheme);
        addEventListenerToMatchMedia(prefersDarkColorSchemeMatch, updateTheme);
    }
};
