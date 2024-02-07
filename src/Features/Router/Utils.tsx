import type { NaviRequest } from "navi";
import { route } from "navi";
import type * as React from "react";

export function createRouteWithErrorHandler(
    getViewAsync: (req: NaviRequest<object>, ctx: object) => Promise<React.ReactElement>,
) {
    return route({
        getView: async (req, ctx) => {
            try {
                return await getViewAsync(req, ctx);
            } catch (error) {
                // TODO: handle error
                return null;
            }
        },
    });
}
