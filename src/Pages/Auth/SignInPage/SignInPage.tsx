import type * as React from "react";

import { useLocalizedString } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";

export const SignInPage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.SIGN_IN_TITLE);
    useSetPageMeta(pageTitle, null);

    return null;
};
