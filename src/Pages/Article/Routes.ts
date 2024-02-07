import { lazy as naviLazy, mount } from "navi";

import { loadArticleListPageRoute } from "./DynimicImports";

export const articleRoutes = mount({
    "/": naviLazy(loadArticleListPageRoute),
});
