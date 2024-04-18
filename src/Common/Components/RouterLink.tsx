import type { LinkProps } from "@fluentui/react-components";
import { Link } from "@fluentui/react-components";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { parseUrlIfSameOrigin, parseUrlToNavigate } from "../Utilities/SameOrigin";

export const RouterLink: React.FC<LinkProps & { as?: "a" }> = (props) => {
    const { href, onClick, onKeyDown } = props;
    const navigate = useNavigate();
    const url = parseUrlIfSameOrigin(href);

    return (
        <Link
            {...props}
            as="a"
            onClick={
                url
                    ? (e) => {
                          e.preventDefault();
                          navigate(parseUrlToNavigate(url));
                          onClick?.(e);
                      }
                    : onClick
            }
            onKeyDown={
                url
                    ? (e) => {
                          if (e.code === "Enter" || e.code === "Space") {
                              e.preventDefault();
                              navigate(parseUrlToNavigate(url));
                              onKeyDown?.(e);
                          }
                      }
                    : onKeyDown
            }
        />
    );
};
