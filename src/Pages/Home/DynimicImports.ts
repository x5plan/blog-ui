export function loadHomePageRoute() {
    return import("./HomePage").then(({ homePageRoute }) => ({
        default: homePageRoute,
    }));
}
