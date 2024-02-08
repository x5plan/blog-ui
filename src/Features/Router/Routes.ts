import { lazy as naviLazy, mount } from "navi";

import { CE_PageBaseRoute } from "@/Features/Page/Types";
import { loadArticleRoutes } from "@/Pages/Article/DynimicImports";
import { loadSignInPageRoute, loadSignUpPageRoute } from "@/Pages/Auth/DynimicImports";
import { loadHomeRoutes } from "@/Pages/Home/DynimicImports";

export const routes = mount({
    [CE_PageBaseRoute.SignIn]: naviLazy(loadSignInPageRoute),
    [CE_PageBaseRoute.SignUp]: naviLazy(loadSignUpPageRoute),
    [CE_PageBaseRoute.Article]: naviLazy(loadArticleRoutes),
    [CE_PageBaseRoute.Home]: naviLazy(loadHomeRoutes),
});
