import { CE_RecaptchaActions } from "@/Common/Enums/RecaptchaActions";
import { apiRequestAsync } from "@/Common/Request/ApiRequest";
import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";

import type { IGetRegistrationCodeListResponse, IPostRegistrationCodeResponse } from "./Types";

export async function getRegistrationCodeListRequestAsync(recaptchaAsync: IRecaptchaAsync) {
    return await apiRequestAsync<IGetRegistrationCodeListResponse>({
        method: "GET",
        path: "auth/registrationCodeList",
        recaptchaToken: await recaptchaAsync(CE_RecaptchaActions.RegistrationCode),
    });
}

export async function postRegistrationCodeRequestAsync(recaptchaAsync: IRecaptchaAsync) {
    return await apiRequestAsync<IPostRegistrationCodeResponse>({
        method: "POST",
        path: "auth/registrationCode",
        recaptchaToken: await recaptchaAsync(CE_RecaptchaActions.RegistrationCode),
    });
}

export async function deleteRegistrationCodeRequestAsync(
    code: string,
    recaptchaAsync: IRecaptchaAsync,
) {
    return await apiRequestAsync<undefined, undefined, undefined>({
        method: "DELETE",
        path: `auth/registrationCode/${code}`,
        recaptchaToken: await recaptchaAsync(CE_RecaptchaActions.RegistrationCode),
    });
}
