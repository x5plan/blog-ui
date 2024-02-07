import { lazy as naviLazy, mount } from "navi";

import { loadArticleRoutes } from "@/Pages/Article/DynimicImports";
import { loadHomeRoutes } from "@/Pages/Home/DynimicImports";

export const routes = mount({
    "/article": naviLazy(loadArticleRoutes),
    "/": naviLazy(loadHomeRoutes),
});
