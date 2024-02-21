import { useToastController } from "@fluentui/react-components";
import * as React from "react";

import { AppToastContext } from "../Components/AppToast";

export const useAppToastController = () => {
    const id = React.useContext(AppToastContext);

    return useToastController(id);
};
