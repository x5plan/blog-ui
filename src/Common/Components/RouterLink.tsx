import type { LinkProps } from "@fluentui/react-components";
import { Link } from "@fluentui/react-components";
import * as React from "react";
import { useNavigation } from "react-navi";

import { parseUrlIfSameOrigin, parseUrlToNavigate } from "../Utilities/SameOrigin";

export const RouterLink: React.FC<LinkProps & { as?: "a" }> = (props) => {
    const { href } = props;
    const navigation = useNavigation();
    const url = parseUrlIfSameOrigin(href);

    return (
        <Link
            {...props}
            as="a"
            onClick={
                url
                    ? (e) => {
                          e.preventDefault();
                          navigation.navigate(parseUrlToNavigate(url));
                      }
                    : undefined
            }
        />
    );
};
