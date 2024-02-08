import { createReducer } from "@reduxjs/toolkit";

import { setPage } from "./Actions";
import type { IPageState } from "./Types";

const pageInitialState: IPageState = {
    pageType: null,
    pageTitle: "",
};

export const pageReducer = createReducer(pageInitialState, (builder) => {
    builder.addCase(setPage, (state, action) => {
        return { ...state, ...action.payload };
    });
});
