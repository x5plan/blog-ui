import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useMarkdownRenderStyles = makeStyles({
    root: {
        position: "relative",
        ...shorthands.overflow("hidden"),
        transform: "translate3d(0, 0, 0)",
        wordBreak: "break-word",

        "& a": {
            ...shorthands.textDecoration("none"),
            color: tokens.colorBrandForegroundLink,

            "&:active": {
                ...shorthands.textDecoration("underline"),
                color: tokens.colorBrandForegroundLinkSelected,
            },

            "&:hover": {
                ...shorthands.textDecoration("underline"),
                color: tokens.colorBrandForegroundLinkHover,
            },
        },

        "& h1, & h2, & h3, & h4, & h5, & h6": {
            ...shorthands.margin("0.5em", "0", "0"),
        },

        "& h1": { fontSize: "24px" },
        "& h2": { fontSize: "22px" },
        "& h3": { fontSize: "18px" },
        "& h4": { fontSize: "16px" },
        "& h5": { fontSize: "14px" },
        "& h6": { fontSize: "12px" },

        "& pre, & code": { fontSize: "12px" },

        "& p, & blockquote": {
            overflowX: "auto",
            overflowY: "hidden",
            ...shorthands.margin("0.5em", "0"),
        },

        "& blockquote": {
            color: tokens.colorNeutralForeground3,
            backgroundColor: tokens.colorNeutralBackground3,
            paddingLeft: "1em",
            ...shorthands.borderLeft("0.25em", "solid", tokens.colorNeutralStroke1),
            ...shorthands.margin("1em", "0"),
        },

        "& ul, & ol, & blockquote": {
            "&:first-child": {
                marginTop: "0 !important",
            },

            "&:last-child": {
                marginBottom: "0 !important",
            },
        },

        "& p>img:only-child": {
            display: "block",
            ...shorthands.margin("0", "auto"),
            maxWidth: "100%",
        },

        "& ul, & ol": {
            paddingLeft: "2em",
            "& ul, & ol": {
                paddingLeft: "1.5em",
            },
        },
    },
});
