import type * as React from "react";

import { useSetPageType } from "@/Common/Hooks/SetPageType";
import { CE_PageType } from "@/Features/Page/Types";

export const ArticleListPage: React.FC = () => {
    useSetPageType(CE_PageType.Article);

    // TODO: Implement ArticleListPage

    return null;
};
