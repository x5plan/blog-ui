import type * as React from "react";

import { useSetPageType } from "@/Common/Hooks/SetPageType";
import { CE_PageType } from "@/Features/Page/Types";

export const HomePage: React.FC = () => {
    useSetPageType(CE_PageType.Home);

    // TODO: Implement HomePage

    return null;
};
