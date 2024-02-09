import { useAppSelector } from "../Store/Store";
import { getCurrentUser } from "./Selectors";

export const useCurrentUser = () => useAppSelector(getCurrentUser);
export const useIsSignedIn = () => !!useAppSelector(getCurrentUser);
