import * as React from "react";

import { createRouteWithErrorHandler } from "@/Features/Router/Utils";

import { ArticleListPage } from "./ArticleListPage";

export const articleListPageRoute = createRouteWithErrorHandler(async () => {
    // TODO: Fetch data

    return <ArticleListPage />;
});
