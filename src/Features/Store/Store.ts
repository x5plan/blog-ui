import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { getIsProd } from "../Environment/Settings/ImportEnv";
import { reducers } from "./Reducers";
import type { IAppDispatch, IRootState } from "./Types";

export const store = configureStore({
    reducer: reducers,
    devTools: !getIsProd(),
});

export const useAppDispatch: () => IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export const getState = () => store.getState();
