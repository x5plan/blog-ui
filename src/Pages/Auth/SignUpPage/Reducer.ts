import { createReducer } from "@reduxjs/toolkit";

import { setSignUpPage } from "./Actions";
import type { ISignUpPageState } from "./Types";

const signUpPageInitialState: ISignUpPageState = {
    lastSendEmailVerificationCodeTime: 0,
};

export const signUpPageReducer = createReducer(signUpPageInitialState, (builder) => {
    builder.addCase(setSignUpPage, (state, action) => ({
        ...state,
        ...action.payload,
    }));
});
