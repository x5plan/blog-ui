import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

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
    usedStatus: {},
});
