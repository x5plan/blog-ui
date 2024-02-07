export function loadHomeRoutes() {
    return import("./Routes").then(({ homeRoutes }) => ({
        default: homeRoutes,
    }));
}

export function loadHomePageRoute() {
    return import("./HomePage").then(({ homePageRoute }) => ({
        default: homePageRoute,
    }));
}
