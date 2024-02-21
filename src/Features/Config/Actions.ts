import { createAction } from "@reduxjs/toolkit";

import type { IConfigState } from "./Types";

const UPDATE_CONFIG = "Config/Update";

export const setConfigAction = createAction(UPDATE_CONFIG, (props: Partial<IConfigState>) => ({
    payload: props,
}));
