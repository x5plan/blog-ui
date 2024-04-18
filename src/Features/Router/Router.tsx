import { Spinner } from "@fluentui/react-components";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorPage } from "../Error/ErrorPage";
import { useLocalizedString } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { routes } from "./Routes";

export const AppRouter: React.FC<React.PropsWithChildren> = (props) => {
    const notFoundErrorMessage = useLocalizedString(CE_Strings.APP_ERROR_COMMON_INVALID_URL);

    const router = createBrowserRouter([
        {
            element: props.children,
            children: [
                ...routes,
                {
                    path: "*",
                    element: <ErrorPage message={notFoundErrorMessage} showBackButton={true} />,
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} fallbackElement={<Spinner style={{ height: "100%" }} />} />
    );
};
