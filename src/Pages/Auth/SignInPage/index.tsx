import * as React from "react";

import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { SignInPage } from "./SignInPage";

export const signInPageRoute = createRouteWithErrorHandler(async (req) => {
    return <SignInPage redirectPath={req.query.redirect} />;
});
