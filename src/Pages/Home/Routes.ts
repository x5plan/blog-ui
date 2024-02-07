import { lazy as naviLazy, mount } from "navi";

import { loadHomePageRoute } from "./DynimicImports";

export const homeRoutes = mount({
    "/": naviLazy(loadHomePageRoute),
});
