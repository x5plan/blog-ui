import { createAction } from "@reduxjs/toolkit";

import type { IAppDispatch } from "../Store/Types";
import { initThemeAction } from "../Theme/Actions";
import { isMiddleScreen, isMiniScreen, isMobileView, isSmallScreen } from "./Settings/Screen";
import {
    isAndroid,
    isChrome,
    isEdge,
    isFireFox,
    isIOS,
    isMobile,
    isSafari,
} from "./Settings/UserAgent";
import type { IEnvState } from "./Types";

const UPDATE_ENV = "Env/Update";

export const setEnvAction = createAction(UPDATE_ENV, (props: Partial<IEnvState>) => ({
    payload: props,
}));

export const initEnvAction = (dispatch: IAppDispatch) => {
    dispatch(
        setEnvAction({
            isMobile: isMobile(),
            isMiniScreen: isMiniScreen(),
            isSmallScreen: isSmallScreen(),
            isMiddleScreen: isMiddleScreen(),
            isMobileView: isMobileView(),

            isAndroid: isAndroid(),
            isIOS: isIOS(),

            isChrome: isChrome(),
            isEdge: isEdge(),
            isFirefox: isFireFox(),
            isSafari: isSafari(),
        }),
    );
    dispatch(initThemeAction);
    dispatch(bindWindowListenerAction);
};

function bindWindowListenerAction(dispatch: IAppDispatch) {
    window.addEventListener("resize", () =>
        dispatch(
            setEnvAction({
                isMobile: isMobile(),
                isMiniScreen: isMiniScreen(),
                isSmallScreen: isSmallScreen(),
                isMiddleScreen: isMiddleScreen(),
                isMobileView: isMobileView(),
            }),
        ),
    );
}
