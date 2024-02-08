import * as React from "react";

import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { SignUpPage } from "./SignUpPage";

export const signUpPageRoute = createRouteWithErrorHandler(async () => {
    return <SignUpPage />;
});
