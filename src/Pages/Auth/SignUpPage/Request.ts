import { CE_RecaptchaActions } from "@/Common/Enums/RecaptchaActions";
import { apiRequestAsync } from "@/Common/Request/ApiRequest";
import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";

import type { IPostSignUpRequestBody, IPostSignUpResponse } from "./Types";

export async function postSignUpRequestAsync(
    body: IPostSignUpRequestBody,
    recaptchaAsync: IRecaptchaAsync,
) {
    return await apiRequestAsync<IPostSignUpResponse, undefined, IPostSignUpRequestBody>(
        {
            method: "POST",
            path: "auth/register",
            body,
            recaptchaToken: await recaptchaAsync(CE_RecaptchaActions.SignUp),
        },
        [
            CE_ErrorCode.Auth_DuplicateUsername,
            CE_ErrorCode.Auth_DuplicateEmail,
            CE_ErrorCode.Auth_InvalidEmailVerificationCode,
            CE_ErrorCode.Auth_InvalidateRegistrationCode,
        ],
    );
}
