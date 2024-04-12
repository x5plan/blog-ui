import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useInvitationCodeDialogStyles = makeStyles({
    contentRoot: {
        ...flex({
            flexDirection: "column",
        }),
        ...shorthands.gap(tokens.spacingVerticalS),
    },
    field: {
        ...flex({
            flexDirection: "column",
        }),
        ...shorthands.gap(tokens.spacingVerticalXS),
    },
    fieldLabel: {
        fontWeight: tokens.fontWeightBold,
    },
    fieldContainer: {
        ...flex({}),
        width: "100%",
        ...shorthands.gap(tokens.spacingVerticalS),
    },
    filedData: {
        ...flex({
            flexDirection: "column",
        }),
        flexGrow: 1,
        paddingLeft: tokens.spacingHorizontalXS,
    },
    fieldAction: {
        ...flex({
            justifyContent: "center",
        }),
    },
    activeStatus: {
        ...flex({
            alignItems: "center",
        }),
        ...shorthands.gap(tokens.spacingHorizontalXS),
        color: tokens.colorStatusSuccessForeground1,
    },
    expiredStatus: {
        ...flex({
            alignItems: "center",
        }),
        ...shorthands.gap(tokens.spacingHorizontalXS),
        color: tokens.colorStatusWarningForeground1,
    },
    usedStatus: {
        ...flex({
            alignItems: "center",
        }),
        ...shorthands.gap(tokens.spacingHorizontalXS),
        color: tokens.colorBrandForeground1,
    },
});
