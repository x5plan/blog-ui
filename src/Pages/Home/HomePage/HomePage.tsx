import type * as React from "react";

import { useLocalizedString } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";
import { CE_PageType } from "@/Features/Page/Types";

export const HomePage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.HOME_PAGE_TITLE);
    useSetPageMeta(pageTitle, CE_PageType.Home);

    // TODO: Implement HomePage

    return null;
};
