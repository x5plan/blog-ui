import type { NaviRequest } from "navi";
import { route } from "navi";
import * as React from "react";

import { AppError } from "../Error/AppError";
import { AppErrorPage } from "../Error/AppErrorPage";
import { CE_ErrorCode } from "../Error/ErrorCode";
import type { IAppRouterContext } from "./Router";

export function createRouteWithErrorHandler(
    getViewAsync: (
        req: NaviRequest<IAppRouterContext>,
        ctx: IAppRouterContext,
    ) => Promise<React.ReactElement>,
) {
    return route({
        getView: async (req, ctx: IAppRouterContext) => {
            try {
                return await getViewAsync(req, ctx);
            } catch (error) {
                if (error instanceof AppError) {
                    return <AppErrorPage error={error} showBackButton={true} />;
                } else if (error instanceof Error) {
                    return (
                        <AppErrorPage error={new AppError(CE_ErrorCode.Unknown, error.message)} />
                    );
                } else {
                    return (
                        <AppErrorPage error={new AppError(CE_ErrorCode.Unknown, "Unknown error")} />
                    );
                }
            }
        },
    });
}
