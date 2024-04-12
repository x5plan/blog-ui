import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";
import { MAX_MIDDLE_SCREEN_WIDTH } from "@/Features/Environment/Settings/Screen";

const headerHeight = "50px";

export const useAppLayoutStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        minWidth: "320px",
        backgroundColor: tokens.colorNeutralBackground2,
    },
    header: {
        ...flex({
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
        }),
        height: headerHeight,
        boxShadow: tokens.shadow4,
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.padding("0", "40px"),
    },
    headerMiddleScreen: {
        ...shorthands.padding("0", "10px", "0", "40px"),
    },
    headerMiniScreen: {
        ...shorthands.padding("0", "10px"),
    },
    body: {
        ...flex({
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
        }),
        height: `calc(100% - ${headerHeight})`,
        overflowX: "hidden",
        overflowY: "auto",
        ...shorthands.padding("20px", "40px"),
    },
    bodySmallScreen: {
        ...shorthands.padding("20px", "20px"),
    },
    bodyMiniScreen: {
        ...shorthands.padding("20px", "10px"),
    },
    container: {
        maxWidth: `${MAX_MIDDLE_SCREEN_WIDTH}px`,
        width: "100%",
        flexGrow: 1,
    },
    footer: {
        ...flex({
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }),
        ...shorthands.gap("4px"),
        color: tokens.colorNeutralForeground3,
        marginTop: "20px",
        marginBottom: "20px",
    },
    footerText: {
        fontSize: "12px",
        textAlign: "center",
    },
});
