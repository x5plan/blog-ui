import { createAction } from "@reduxjs/toolkit";

import type { IAppDispatch } from "../Store/Types";
import type { CE_PageType, IPageState } from "./Types";

const UPDATE_PAGE = "Page/Update";

export const setPage = createAction(UPDATE_PAGE, (props: Partial<IPageState>) => ({
    payload: props,
}));

export const updatePageTypeAction = (pageType: CE_PageType | null) => (dispatch: IAppDispatch) => {
    dispatch(setPage({ pageType }));
};

export const updatePageTitleAction = (pageTitle: string) => (dispatch: IAppDispatch) => {
    dispatch(setPage({ pageTitle }));
};
