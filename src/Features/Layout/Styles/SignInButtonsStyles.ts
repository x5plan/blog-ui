import { makeStyles, shorthands } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useSignInButtonsStyles = makeStyles({
    root: {
        ...flex({
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }),
        ...shorthands.gap("10px"),
    },
    button: {
        minWidth: "unset",
    },
});

export const useSignInLinksStyles = makeStyles({
    root: {
        ...flex({
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        }),
        ...shorthands.gap("28px"),
        width: "100%",
        marginTop: "20px",
    },
});
