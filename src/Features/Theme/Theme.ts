import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from "@fluentui/react-components";

import type { ITheme } from "./Types";
import { CE_Theme } from "./Types";

export const themeMap: Record<CE_Theme, ITheme> = {
    [CE_Theme.Light]: webLightTheme,
    [CE_Theme.Dark]: webDarkTheme,
    [CE_Theme.HighContrast]: teamsHighContrastTheme,
};
