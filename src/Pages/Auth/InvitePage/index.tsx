import * as React from "react";

import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { InvitePage } from "./InvitePage";
import { getRegistrationCodeListRequestAsync } from "./Request";

export const invitePageRoute = createRouteWithErrorHandler(async (req, ctx) => {
    const { data: registrationCodeList } = await getRegistrationCodeListRequestAsync(
        ctx.recaptchaAsync,
    );

    return <InvitePage registrationCodeList={registrationCodeList} />;
});
