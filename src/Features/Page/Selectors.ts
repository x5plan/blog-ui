import type { IRootState } from "../Store/Types";

export const getPageType = (state: IRootState) => state.page.pageType;
export const getPageTitle = (state: IRootState) => state.page.pageTitle;
