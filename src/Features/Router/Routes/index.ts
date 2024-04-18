import type { RouteObject } from "react-router-dom";

import { CE_PageBaseRoute } from "@/Features/Page/Types";
import {
    loadInvitePageRoute,
    loadSignInPageRoute,
    loadSignUpPageRoute,
} from "@/Pages/Auth/DynimicImports";
import { loadHomePageRoute } from "@/Pages/Home/DynimicImports";

import { routeLazy } from "../Utils";
import { articleRoutes } from "./Article";

export const routes: RouteObject[] = [
    {
        path: CE_PageBaseRoute.Article,
        children: articleRoutes,
    },
    {
        path: CE_PageBaseRoute.SignIn,
        lazy: routeLazy(loadSignInPageRoute),
    },
    {
        path: CE_PageBaseRoute.SignUp,
        lazy: routeLazy(loadSignUpPageRoute),
    },
    {
        path: CE_PageBaseRoute.Invite,
        lazy: routeLazy(loadInvitePageRoute),
    },
    {
        path: CE_PageBaseRoute.Home,
        lazy: routeLazy(loadHomePageRoute),
    },
];
