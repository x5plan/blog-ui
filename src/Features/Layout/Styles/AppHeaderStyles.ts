import { makeStyles, shorthands } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useAppHeaderStyles = makeStyles({
    root: {
        ...flex({
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }),
        height: "100%",
    },
    left: {
        ...flex({
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }),
        height: "100%",
    },
    right: {
        ...flex({
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }),
        height: "100%",
    },
    title: {
        ...flex({
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }),
        height: "100%",
        fontSize: "20px",
        fontWeight: "600",
        ...shorthands.padding("0", "10px"),
    },
});
