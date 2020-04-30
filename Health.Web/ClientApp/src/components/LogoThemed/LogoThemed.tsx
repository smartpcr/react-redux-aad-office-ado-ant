import React from "react";
import classNames from "classnames";
import { ThemeConsumer, Styles, Colors } from "~/components/Theme";

import white from "~/assets/logo-white.svg";

const logos = {
    white
};

const getLogoUrl = (style: string, color: string) => {
    return logos[color];
};

export interface ILogoProps {
    checkBackground?: boolean;
    className?: string;
}

// Check for background
const getLogoUrlBackground = (style: string, color: string) => {
    if (style === "color") {
        return logos.white;
    } else {
        return getLogoUrl(style, color);
    }
};

const LogoThemed: React.FunctionComponent<ILogoProps> = ({ checkBackground, className, ...otherProps }) => (
    <ThemeConsumer>
        {
            ({ style, color }) => (
                <img
                    src={
                        checkBackground ?
                            getLogoUrlBackground(style ?? Styles.dark, color ?? Colors.primary) :
                            getLogoUrl(style ?? Styles.dark, color ?? Colors.primary)
                    }
                    className={classNames("d-block", className)}
                    alt="Airframe Logo"
                    {...otherProps}
                />
            )
        }
    </ThemeConsumer>
);

export { LogoThemed };
