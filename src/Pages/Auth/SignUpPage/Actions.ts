import { createAction } from "@reduxjs/toolkit";

import type { IAppDispatch } from "@/Features/Store/Types";

import type { ISignUpPageState } from "./Types";

const UPDATE_SIGN_UP_PAGE = "SignUpPage/Update";

export const setSignUpPage = createAction(
    UPDATE_SIGN_UP_PAGE,
    (props: Partial<ISignUpPageState>) => ({
        payload: props,
    }),
);

export const updateLastSendEmailVerificationCodeTime = (time: number) => (dispatch: IAppDispatch) =>
    dispatch(setSignUpPage({ lastSendEmailVerificationCodeTime: time }));
