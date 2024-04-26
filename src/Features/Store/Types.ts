import type { ISignUpPageState } from "@/Pages/Auth/SignUpPage/Types";

import type { IAuthState } from "../Auth/Types";
import type { IConfigState } from "../Config/Types";
import type { IEnvState } from "../Environment/Types";
import type { ILocaleState } from "../LocalizedString/Types";
import type { IPageState } from "../Page/Types";
import type { store } from "./Store";

export interface IStaticReducerMap {
    env: IEnvState;
    locale: ILocaleState;
    page: IPageState;
    auth: IAuthState;
    config: IConfigState;
}

export interface IDynamicReducerMap {
    signUpPage: ISignUpPageState;
}

export type IReducerMap = IDynamicReducerMap & IStaticReducerMap;

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
