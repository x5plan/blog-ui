import * as React from "react";
import type { LazyRouteFunction, RouteObject } from "react-router-dom";

import { RouteWithErrorHandler } from "./Components/RouteWithErrorHandler";
import type { IGetViewFunction, IRouteObjectWithElement } from "./Types";

export function createRouteWithErrorHandler(
    getViewAsync: IGetViewFunction,
    onRouting?: () => void,
): IRouteObjectWithElement {
    onRouting?.();
    return {
        element: <RouteWithErrorHandler getViewAsync={getViewAsync} />,
    };
}

export function routeLazy(
    loader: () => Promise<{ default: IRouteObjectWithElement } | IRouteObjectWithElement>,
): LazyRouteFunction<RouteObject> {
    return () => loader().then((module) => ("default" in module ? module.default : module));
}
