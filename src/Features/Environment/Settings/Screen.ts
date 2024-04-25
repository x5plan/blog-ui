import {
    MAX_MIDDLE_SCREEN_WIDTH,
    MAX_MINI_SCREEN_WIDTH,
    MAX_SMALL_SCREEN_WIDTH,
} from "@/Common/Constants/ScreenWidth";

import { isMobile } from "./UserAgent";

export function getWindowWidth(): number {
    return window.innerWidth;
}

export function isMiniScreen(): boolean {
    return getWindowWidth() <= MAX_MINI_SCREEN_WIDTH;
}

export function isSmallScreen(): boolean {
    return getWindowWidth() <= MAX_SMALL_SCREEN_WIDTH;
}

export function isMiddleScreen(): boolean {
    return getWindowWidth() <= MAX_MIDDLE_SCREEN_WIDTH;
}

export function isMobileView(): boolean {
    return (isMobile() && isSmallScreen()) || isMiniScreen();
}
