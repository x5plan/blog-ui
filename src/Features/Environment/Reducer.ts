import { createReducer } from "@reduxjs/toolkit";

import { setEnvAction } from "./Actions";
import type { IEnvState } from "./Types";

const envInitialState: IEnvState = {} as unknown as IEnvState;

export const envReducer = createReducer<IEnvState>(envInitialState, (builder) => {
    builder.addCase(setEnvAction, (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    });
});
