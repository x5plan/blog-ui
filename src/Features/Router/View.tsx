import { Spinner } from "@fluentui/react-components";
import * as React from "react";
import { Outlet } from "react-router-dom";

export const AppView: React.FC = () => {
    return (
        <React.Suspense fallback={<Spinner style={{ height: "100%" }} />}>
            <Outlet />
        </React.Suspense>
    );
};
