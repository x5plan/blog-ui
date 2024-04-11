import * as React from "react";

import { getCurrentUser } from "@/Features/Auth/Selectors";
import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { SignUpPage } from "./SignUpPage";

export const signUpPageRoute = createRouteWithErrorHandler(async (req, ctx) => {
    const currentUser = getCurrentUser(ctx.getRootState());

    if (currentUser) {
        ctx.getNavigation().navigate(req.query.redirect || "/");
        return null;
    }

    return <SignUpPage />;
});
