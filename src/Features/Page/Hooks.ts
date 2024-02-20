import * as React from "react";

import { useAppDispatch, useAppSelector } from "../Store/Store";
import { updatePageTitleAction, updatePageTypeAction } from "./Actions";
import { getPageTitle, getPageType } from "./Selectors";
import type { CE_PageType } from "./Types";

export const usePageType = () => useAppSelector(getPageType);
export const usePageTitle = () => useAppSelector(getPageTitle);

export const useSetPageMeta = (pageTitle: string, pageType: CE_PageType | null) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(updatePageTitleAction(pageTitle));
    }, [dispatch, pageTitle]);

    React.useEffect(() => {
        dispatch(updatePageTypeAction(pageType));
    }, [dispatch, pageType]);
};
