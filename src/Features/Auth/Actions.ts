import { createAction } from "@reduxjs/toolkit";

import { CE_StroageKeys } from "@/Common/Enums/StorageKeys";
import { getLocalStorage } from "@/Common/Utilities/SafeStorage";

import type { IAppDispatch } from "../Store/Types";
import type { IAuthState } from "./Types";

const UPDATE_AUTH = "Auth/Update";

export const setAuthAction = createAction(UPDATE_AUTH, (props: Partial<IAuthState>) => ({
    payload: props,
}));

export const updateBearerTokenAction = (token: string) => (dispatch: IAppDispatch) => {
    dispatch(setAuthAction({ bearerToken: token }));
    getLocalStorage().setItem(CE_StroageKeys.ApiBearerToken, token);
};
