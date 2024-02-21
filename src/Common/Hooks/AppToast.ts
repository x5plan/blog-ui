import { useToastController } from "@fluentui/react-components";
import * as React from "react";

import { AppToastContext } from "../Providers/AppToastProvider";

export const useAppToastController = () => {
    const id = React.useContext(AppToastContext);

    return useToastController(id);
};
