import type * as React from "react";

import { useLocalizedString } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";
import { CE_PageType } from "@/Features/Page/Types";

export const ArticleListPage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.ARTICLE_PAGE_TITLE);
    useSetPageMeta(pageTitle, CE_PageType.Article);

    // TODO: Implement ArticleListPage

    return null;
};
