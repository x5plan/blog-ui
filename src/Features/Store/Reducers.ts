import type { ReducersMapObject } from "redux";

import { authReducer } from "../Auth/Reducer";
import { configReducer } from "../Config/Reducer";
import { envReducer } from "../Environment/Reducer";
import { localeReducers } from "../LocalizedString/Reducer";
import { pageReducer } from "../Page/Reducer";
import type { IReducerMap, IStaticReducerMap } from "./Types";

export const staticReducers: ReducersMapObject<IStaticReducerMap> = {
    env: envReducer,
    locale: localeReducers,
    page: pageReducer,
    auth: authReducer,
    config: configReducer,
};

export const reducers: ReducersMapObject<IReducerMap> =
    staticReducers as unknown as ReducersMapObject<IReducerMap>;
