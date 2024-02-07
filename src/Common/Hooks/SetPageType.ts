import * as React from "react";

import { updatePageTypeAction } from "@/Features/Page/Actions";
import type { CE_PageType } from "@/Features/Page/Types";
import { useAppDispatch } from "@/Features/Store/Store";

export const useSetPageType = (pageType: CE_PageType) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(updatePageTypeAction(pageType));
    }, [dispatch, pageType]);
};
