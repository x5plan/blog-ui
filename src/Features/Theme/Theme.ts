import {
    teamsDarkTheme,
    teamsHighContrastTheme,
    teamsLightTheme,
} from "@fluentui/react-components";

import type { ITheme } from "./Types";
import { CE_Theme } from "./Types";

export const themeMap: Record<CE_Theme, ITheme> = {
    [CE_Theme.Light]: teamsLightTheme,
    [CE_Theme.Dark]: teamsDarkTheme,
    [CE_Theme.HighContrast]: teamsHighContrastTheme,
};
