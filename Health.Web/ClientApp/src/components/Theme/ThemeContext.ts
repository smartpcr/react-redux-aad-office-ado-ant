import React from "react";
import { ChangeThemeArgs } from "./ThemeSelector";

export type IThemeConsumerProps = {
    style?: string;
    color?: string;
    onChangeTheme?(themeState: ChangeThemeArgs): void;
};

const { Provider, Consumer } = React.createContext<IThemeConsumerProps>({});

export { Provider, Consumer };
