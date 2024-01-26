import type { IEnvState } from "../Environment/Types";
import type { store } from "./Store";

export interface IStaticReducerMap {
    env: IEnvState;
}

export interface IDynamicReducerMap {}

export type IReducerMap = IDynamicReducerMap & IStaticReducerMap;

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
