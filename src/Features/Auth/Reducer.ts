import { createReducer } from "@reduxjs/toolkit";

import { setAuthAction } from "@/Features/Auth/Actions";

import type { IAuthState } from "./Types";

const initialAuthState: IAuthState = {
    bearerToken: "",
    currentUser: null,
};

export const authReducer = createReducer<IAuthState>(initialAuthState, (builder) => {
    builder.addCase(setAuthAction, (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    });
});
