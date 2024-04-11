import * as React from "react";

import { getCurrentUser } from "@/Features/Auth/Selectors";
import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { SignInPage } from "./SignInPage";

export const signInPageRoute = createRouteWithErrorHandler(async (req, ctx) => {
    const currentUser = getCurrentUser(ctx.getRootState());

    if (currentUser) {
        ctx.getNavigation().navigate(req.query.redirect || "/");
        return null;
    }

    return <SignInPage redirectPath={req.query.redirect} />;
});
