import { CE_RecaptchaActions } from "@/Common/Enums/RecaptchaActions";
import { apiRequestAsync } from "@/Common/Request/ApiRequest";
import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";

import type { IGetRegistrationCodeListResponse, IPostRegistrationCodeResponse } from "./Types";

export async function getRegistrationCodeListRequestAsync(recaptchaAsync: IRecaptchaAsync) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
