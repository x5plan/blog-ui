import { Button, type ButtonProps } from "@fluentui/react-components";
import * as React from "react";
import { useNavigation } from "react-navi";

import { parseUrlIfSameOrigin } from "../Utilities/SameOrigin";

export type IRouterButtonProps = ButtonProps & {
    to: string;
    onClick?: () => void;
};

export const RouterButton: React.FC<IRouterButtonProps> = (props) => {
    const { to, onClick, ...rest } = props;
    const navigation = useNavigation();
    const url = parseUrlIfSameOrigin(to);

    return (
        <Button
            {...rest}
            onClick={() => {
                if (url) {
                    navigation.navigate(url);
                }
                onClick?.();
            }}
        />
    );
};
