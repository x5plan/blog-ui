export function loadArticleRoutes() {
    return import("./Routes").then(({ articleRoutes }) => ({
        default: articleRoutes,
    }));
}

export function loadArticleListPageRoute() {
    return import("./ArticleListPage").then(({ articleListPageRoute }) => ({
        default: articleListPageRoute,
    }));
}
