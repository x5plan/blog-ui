import * as React from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "@/Features/Auth/Selectors";
import { CE_PageBaseRoute } from "@/Features/Page/Types";
import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { SignInPage } from "./SignInPage";

export const signInPageRoute = createRouteWithErrorHandler(async ({ getState, searchParams }) => {
    const currentUser = getCurrentUser(getState());

    const redirect = searchParams.get("redirect");

    if (currentUser) {
        return <Navigate to={redirect || CE_PageBaseRoute.Home} replace={true} />;
    }

    return <SignInPage redirectPath={redirect} />;
});
