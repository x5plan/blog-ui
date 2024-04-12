import { makeStyles, tokens } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useInvitePageStyles = makeStyles({
    root: {},
    title: {
        ...flex({
            justifyContent: "center",
        }),
        width: "100%",
        fontSize: tokens.fontSizeHero700,
        lineHeight: tokens.lineHeightHero700,
        fontWeight: tokens.fontWeightSemibold,
    },
    container: {
        ...flex({
            flexDirection: "column",
        }),
        width: "100%",
        marginTop: tokens.spacingVerticalXL,
    },
    buttonContainer: {
        ...flex({
            flexDirection: "row-reverse",
        }),
        width: "100%",
    },
    button: {
        width: "180px",
    },
    list: {
        marginTop: "20px",
    },
});
