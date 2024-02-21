import { apiRequestAsync } from "@/Common/Request/ApiRequest";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";

import type { IPostSignInRequestBody, IPostSignInResponse } from "./Types";

export async function postSignInRequestAsync(body: IPostSignInRequestBody, recaptchaToken: string) {
    return await apiRequestAsync<IPostSignInResponse, undefined, IPostSignInRequestBody>(
        {
            method: "POST",
            path: "auth/login",
            body,
            recaptchaToken,
        },
        [CE_ErrorCode.Auth_NoSuchUser, CE_ErrorCode.Auth_WrongPassword] /* ignoreErrorCodes */,
    );
}
