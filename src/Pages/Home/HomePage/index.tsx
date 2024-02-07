import * as React from "react";

import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { HomePage } from "./HomePage";

export const homePageRoute = createRouteWithErrorHandler(async () => {
    // TODO: fetch data

    return <HomePage />;
});
