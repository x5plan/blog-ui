import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useInvitationCodeTableStyles = makeStyles({
    statusColumn: {
        width: "120px",
    },
    statusSingleIconColumn: {
        width: "48px",
    },
    codeColumn: {},
    expireColumn: {
        width: "180px",
    },
    userColumn: {
        width: "200px",
    },
    persona: {
        "& .fui-Persona__primaryText, & .fui-Persona__secondaryText": {
            ...shorthands.overflow("hidden"),
            maxWidth: "100%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    },
    actionColumn: {
        width: "48px",
    },
    activeStatus: {
        color: tokens.colorStatusSuccessForeground1,
    },
    expiredStatus: {
        color: tokens.colorStatusWarningForeground1,
    },
    usedStatus: {
        color: tokens.colorBrandForeground1,
    },
    statusLayout: {
        ...flex({
            justifyContent: "center",
            alignItems: "center",
        }),
    },
    deleteConfirmation: {
        ...flex({
            flexDirection: "column",
        }),
        ...shorthands.gap(tokens.spacingVerticalS),
        maxWidth: "320px",
    },
    deleteConfirmationLabel: {
        fontWeight: tokens.fontWeightSemibold,
    },
    deleteConfirmationButtons: {
        ...flex({
            flexDirection: "row-reverse",
        }),
        ...shorthands.gap(tokens.spacingHorizontalS),
    },
});
