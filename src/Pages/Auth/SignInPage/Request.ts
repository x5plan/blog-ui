import { CE_RecaptchaActions } from "@/Common/Enums/RecaptchaActions";
import { apiRequestAsync } from "@/Common/Request/ApiRequest";
import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";

import type { IPostSignInRequestBody, IPostSignInResponse } from "./Types";

export async function postSignInRequestAsync(
    body: IPostSignInRequestBody,
    recaptchaAsync: IRecaptchaAsync,
) {
    return await apiRequestAsync<IPostSignInResponse, undefined, IPostSignInRequestBody>(
        {
            method: "POST",
            path: "auth/login",
            body,
            recaptchaToken: await recaptchaAsync(CE_RecaptchaActions.SignIn),
        },
        [CE_ErrorCode.Auth_NoSuchUser, CE_ErrorCode.Auth_WrongPassword] /* ignoreErrorCodes */,
    );
}
