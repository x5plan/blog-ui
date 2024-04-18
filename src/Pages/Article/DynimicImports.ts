export function loadArticleListPageRoute() {
    return import("./ArticleListPage").then(({ articleListPageRoute }) => ({
        default: articleListPageRoute,
    }));
}
