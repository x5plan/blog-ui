/* 
Keep this file separate to avoid circular references.

We cannot define function initAuthAction in Actions.ts,
because it will create a circular reference.

This file <- ./Actions.ts
This file <- ./Request.ts
          <- @/Common/Request/ApiRequest.ts
          <- @/Features/Store/Store.ts
          <- ./Reducer.ts
          <- ./Actions.ts
*/

import { CE_StroageKeys } from "@/Common/Enums/StorageKeys";
import { getLocalStorage } from "@/Common/Utilities/SafeStorage";

import { setConfigAction } from "../Config/Actions";
import type { IAppDispatch } from "../Store/Types";
import { setAuthAction, updateBearerTokenAction } from "./Actions";
import { getAccessTokenRequestAsync, postSignOutUserRequestAsync } from "./Request";

export const initAuthAction = async (dispatch: IAppDispatch) => {
    const token = getLocalStorage().getItem(CE_StroageKeys.ApiBearerToken);

    const { data } = await getAccessTokenRequestAsync(token);

    if (!data) {
        dispatch(updateBearerTokenAction(""));
        return;
    }

    dispatch(
        setAuthAction({
            bearerToken: token,
            currentUser: data.userBaseDetail,
        }),
    );
    dispatch(setConfigAction(data.config));
};

export const signOutUserRequestAction = async (dispatch: IAppDispatch) => {
    await postSignOutUserRequestAsync();
    dispatch(updateBearerTokenAction(""));
    dispatch(setAuthAction({ currentUser: null }));
};
