import * as React from "react";
import { Router } from "react-navi";

import { routes } from "./Routes";

export interface IAppRouterProps {
    children: React.ReactElement;
}

export const AppRouter: React.FC<IAppRouterProps> = (props) => {
    return <Router routes={routes}>{props.children}</Router>;
};
