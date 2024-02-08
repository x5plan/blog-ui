import { createAction } from "@reduxjs/toolkit";

import { CE_StroageKeys } from "@/Common/Enums/StorageKeys";
import type { IUserBaseDetail } from "@/Common/ServerTypes/User";
import { getLocalStorage } from "@/Common/Utilities/SafeStorage";

import type { IAppDispatch } from "../Store/Types";
import type { IAuthState } from "./Types";

const UPDATE_AUTH = "Auth/Update";

export const setAuthAction = createAction(UPDATE_AUTH, (props: Partial<IAuthState>) => ({
    payload: props,
}));

export const updateBearerToken = (token: string) => (dispatch: IAppDispatch) => {
    dispatch(setAuthAction({ bearerToken: token }));
    getLocalStorage().setItem(CE_StroageKeys.ApiBearerToken, token);
};

export const signInUserAction =
    (token: string, user: IUserBaseDetail) => (dispatch: IAppDispatch) => {
        dispatch(updateBearerToken(token));
        dispatch(setAuthAction({ currentUser: user }));
    };

export const signOutUserAction = () => (dispatch: IAppDispatch) => {
    dispatch(updateBearerToken(""));
    dispatch(setAuthAction({ currentUser: null }));
};
