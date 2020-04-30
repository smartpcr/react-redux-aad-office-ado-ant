import React from "react";
import { Consumer } from "./ThemeContext";

export interface IThemeClassProps {
    color: string;
    style: string;
    children(className: string): JSX.Element;
}

const ThemeClass: React.FunctionComponent<IThemeClassProps> = ({
    children,
    color,
    style
}) => {
    const layoutThemeClass = `layout--theme--${style}--${color}`;
    return children(layoutThemeClass);
};

const ContextThemeClass = (otherProps: any) =>
    <Consumer>
        {
            (themeState) => <ThemeClass {...{ ...themeState, ...otherProps }} />
        }
    </Consumer>;

export { ContextThemeClass as ThemeClass };
