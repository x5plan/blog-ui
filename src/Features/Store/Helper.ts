import type { ReducersMapObject } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import { reducers } from "./Reducers";
import { store } from "./Store";
import type { IDynamicReducerMap, IReducerMap } from "./Types";

let globalReducerMap = reducers;

export function injectDynamicReducer(
    dynamicReducers: Partial<ReducersMapObject<IDynamicReducerMap>>,
) {
    globalReducerMap = {
        ...dynamicReducers,
        ...globalReducerMap,
    };
    store.replaceReducer(combineReducers(globalReducerMap));
}

export function injectOverrideReducer(overrideReducers: Partial<ReducersMapObject<IReducerMap>>) {
    globalReducerMap = {
        ...globalReducerMap,
        ...overrideReducers,
    };
    store.replaceReducer(combineReducers(globalReducerMap));
}
