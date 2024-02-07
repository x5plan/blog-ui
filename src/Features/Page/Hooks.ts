import { useAppSelector } from "../Store/Store";
import { getPageTitle, getPageType } from "./Selectors";

export const usePageType = () => useAppSelector(getPageType);
export const usePageTitle = () => useAppSelector(getPageTitle);
