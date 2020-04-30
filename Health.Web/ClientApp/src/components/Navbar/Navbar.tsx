import React from "react";
import classNames from "classnames";
import { Navbar as BSNavbar, Container } from "reactstrap";

export interface INavbarProps {
    themed: boolean;
    fluid: boolean;
    shadow?: boolean;
    className?: string;
    children?: any;
    color?: string;
    dark?: boolean;
    light?: boolean;
    expand?: boolean;
}

export const defaultProps: INavbarProps = {
    themed: false,
    fluid: false
};

const Navbar: React.FunctionComponent<INavbarProps> = props => {
    const { themed, fluid, shadow, className, children, dark, light, color } = props;
    let navbarClass = classNames({
        "navbar-themed": themed || !!color,
        "navbar-shadow": shadow
    }, "navbar-multi-collapse", className);
    if ((dark || light) && color) {
        navbarClass = classNames(
            navbarClass,
            `navbar-${light ? "light" : ""}${dark ? "dark" : ""}-${color}`);
    }

    return (
        <BSNavbar
            className={navbarClass}
            dark={dark && !color}
            light={light && !color}
        >
            {
                <Container className="navbar-collapse-wrap" fluid={fluid}>
                    {children}
                </Container>
            }
        </BSNavbar>
    );
};

export default Navbar;