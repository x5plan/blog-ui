import * as React from "react";
import { Router } from "react-navi";

import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";

import { routes } from "./Routes";

export interface IAppRouterProps {
    children: React.ReactElement;
}

export interface IAppRouterContext {
    readonly recaptchaAsync: IRecaptchaAsync;
}

export const AppRouter: React.FC<IAppRouterProps> = (props) => {
    const recaptchaAsync = useRecaptchaAsync();

    const context: IAppRouterContext = {
        recaptchaAsync,
    };

    return (
        <Router routes={routes} context={context}>
            {props.children}
        </Router>
    );
};
