import { apiRequestAsync } from "@/Common/Request/ApiRequest";

import type { IGetAccessTokenRequestQuery, IGetAccessTokenResponse } from "./Types";

export async function getAccessTokenRequestAsync(token: string) {
    return await apiRequestAsync<IGetAccessTokenResponse, IGetAccessTokenRequestQuery>({
        method: "GET",
        path: "auth/accessToken",
        query: { token },
    });
}

export async function postSignOutUserRequestAsync() {
    return await apiRequestAsync<void>({
        method: "POST",
        path: "auth/logout",
    });
}
