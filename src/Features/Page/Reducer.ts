import { createReducer } from "@reduxjs/toolkit";

import { setPage } from "./Actions";
import type { IPageState } from "./Types";
import { CE_PageType } from "./Types";

const pageInitialState: IPageState = {
    pageType: CE_PageType.Home,
    pageTitle: "",
};

export const pageReducer = createReducer(pageInitialState, (builder) => {
    builder.addCase(setPage, (state, action) => {
        return { ...state, ...action.payload };
    });
});
