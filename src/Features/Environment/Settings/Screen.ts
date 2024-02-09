import { isMobile } from "./UserAgent";

export const MAX_MINI_SCREEN_WIDTH = 480;
export const MAX_SMALL_SCREEN_WIDTH = 720;
export const MAX_MIDDLE_SCREEN_WIDTH = 1024;

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
