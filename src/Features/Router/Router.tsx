import { createBrowserNavigation, type Navigation } from "navi";
import * as React from "react";
import { Router } from "react-navi";

import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";

import { getState } from "../Store/Store";
import type { IRootState } from "../Store/Types";
import { routes } from "./Routes";

export interface IAppRouterProps {
    children: React.ReactElement;
}

export interface IAppRouterContext {
    readonly recaptchaAsync: IRecaptchaAsync;
    readonly getRootState: () => IRootState;
    readonly getNavigation: () => Navigation;
}

export const AppRouter: React.FC<IAppRouterProps> = (props) => {
    const recaptchaAsync = useRecaptchaAsync();

    const navigation = createBrowserNavigation({ routes });

    const context: IAppRouterContext = {
        recaptchaAsync,
        getRootState: getState,
        getNavigation: () => navigation,
    };

    return (
        <Router navigation={navigation} context={context}>
            {props.children}
        </Router>
    );
};
