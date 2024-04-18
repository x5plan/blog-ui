import type { RouteObject } from "react-router-dom";

import { loadArticleListPageRoute } from "@/Pages/Article/DynimicImports";

import { routeLazy } from "../Utils";

export const articleRoutes: RouteObject[] = [
    {
        path: "",
        lazy: routeLazy(loadArticleListPageRoute),
    },
];
