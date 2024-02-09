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

import type { IAppDispatch } from "../Store/Types";
import { setAuthAction, updateBearerToken } from "./Actions";
import { getAccessTokenRequestAsync, postSignOutUserRequestAsync } from "./Request";

export const initAuthAction = async (dispatch: IAppDispatch) => {
    const token = getLocalStorage().getItem(CE_StroageKeys.ApiBearerToken);

    const { data } = await getAccessTokenRequestAsync(token);

    if (!data) {
        dispatch(updateBearerToken(""));
        return;
    }

    dispatch(
        setAuthAction({
            bearerToken: token,
            currentUser: data.userBaseDetail,
        }),
    );
};

export const signOutUserRequestAction = async (dispatch: IAppDispatch) => {
    await postSignOutUserRequestAsync();
    dispatch(updateBearerToken(""));
    dispatch(setAuthAction({ currentUser: null }));
};
