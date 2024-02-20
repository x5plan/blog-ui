import type * as React from "react";

import { useLocalizedString } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";

export const SignUpPage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.SIGN_UP_TITLE);
    useSetPageMeta(pageTitle, null);

    return null;
};
