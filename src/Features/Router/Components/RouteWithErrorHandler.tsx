import { Spinner } from "@fluentui/react-components";
import * as React from "react";
import { Await } from "react-router-dom";

import { useGetViewFunctionProps } from "../Hooks";
import type { IGetViewFunction } from "../Types";
import { RouteAsyncError } from "./RouteAsyncError";

export const RouteWithErrorHandler: React.FC<{
    getViewAsync: IGetViewFunction;
}> = ({ getViewAsync }) => {
    const getViewFunctionProps = useGetViewFunctionProps();

    const viewPromise = React.useMemo(
        () => getViewAsync(getViewFunctionProps),
        [getViewAsync, getViewFunctionProps],
    );

    return (
        <React.Suspense fallback={<Spinner style={{ height: "100%" }} />}>
            <Await resolve={viewPromise} errorElement={<RouteAsyncError />}>
                {(view) => view}
            </Await>
        </React.Suspense>
    );
};
