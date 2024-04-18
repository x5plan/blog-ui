import * as React from "react";

import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { InvitePage } from "./InvitePage";
import { getRegistrationCodeListRequestAsync } from "./Request";

export const invitePageRoute = createRouteWithErrorHandler(async ({ recaptchaAsync }) => {
    const { data: registrationCodeList } =
        await getRegistrationCodeListRequestAsync(recaptchaAsync);

    return <InvitePage registrationCodeList={registrationCodeList} />;
});
