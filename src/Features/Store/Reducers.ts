import type { ReducersMapObject } from "redux";

import { envReducer } from "../Environment/Reducer";
import type { IReducerMap, IStaticReducerMap } from "./Types";

export const staticReducers: ReducersMapObject<IStaticReducerMap> = {
    env: envReducer,
};

export const reducers: ReducersMapObject<IReducerMap> =
    staticReducers as unknown as ReducersMapObject<IReducerMap>;
