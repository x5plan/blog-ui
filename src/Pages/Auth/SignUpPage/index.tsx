import * as React from "react";
import { Navigate } from "react-router-dom";

import { runOnce } from "@/Common/Utilities/RunOnce";
import { getCurrentUser } from "@/Features/Auth/Selectors";
import { CE_PageBaseRoute } from "@/Features/Page/Types";
import { createRouteWithErrorHandler } from "@/Features/Router/Utils";
import { injectDynamicReducer } from "@/Features/Store/Helper";

import { signUpPageReducer } from "./Reducer";
import { SignUpPage } from "./SignUpPage";

const configureStore = runOnce(() => {
    injectDynamicReducer({
        signUpPage: signUpPageReducer,
    });
});

export const signUpPageRoute = createRouteWithErrorHandler(
    async ({ getState, searchParams }) => {
        const currentUser = getCurrentUser(getState());

        const redirect = searchParams.get("redirect");

        if (currentUser) {
            return <Navigate to={redirect || CE_PageBaseRoute.Home} replace={true} />;
        }

        return <SignUpPage redirectPath={redirect} />;
    },
    () => {
        configureStore();
    },
);
