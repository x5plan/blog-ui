import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useSignUpPageStypes = makeStyles({
    root: {
        ...flex({
            flexDirection: "column",
            alignItems: "center",
        }),
        width: "100%",
    },
    container: {
        marginTop: "24px",
        ...flex({
            flexDirection: "column",
        }),
        width: "100%",
        maxWidth: "820px",
        ...shorthands.borderRadius(tokens.borderRadiusLarge),
        ...shorthands.border("1px", "solid", tokens.colorNeutralStroke1),
        boxShadow: tokens.shadow8,
        ...shorthands.padding("24px"),
        ...shorthands.gap("24px"),
    },
    title: {
        ...flex({
            justifyContent: "center",
        }),
        fontSize: "24px",
        fontWeight: "600",
        marginTop: "10px",
    },
    form: {
        ...flex({
            flexDirection: "column",
        }),
        ...shorthands.gap("24px"),
    },
    fieldsRow: {
        ...flex({
            justifyContent: "space-between",
        }),
        ...shorthands.gap("24px"),
    },
    fieldsColumn: {
        ...flex({
            flexDirection: "column",
        }),
        ...shorthands.gap("24px"),
    },
    fieldContainer: {
        ...flex({
            justifyContent: "space-between",
            alignItems: "flex-end",
        }),
        ...shorthands.gap("12px"),
        flexGrow: 1,
        flexBasis: 0,
    },
    field: {
        flexGrow: 1,
    },
    sendButton: {
        minWidth: "unset",
    },
});
