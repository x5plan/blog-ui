import { createReducer } from "@reduxjs/toolkit";

import { setConfigAction } from "./Actions";
import type { IConfigState } from "./Types";

const initialConfigState: IConfigState = {
    appName: "X5Plan Blog",
} as unknown as IConfigState;

export const configReducer = createReducer<IConfigState>(initialConfigState, (builder) => {
    builder.addCase(setConfigAction, (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    });
});
