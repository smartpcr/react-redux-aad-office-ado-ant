import "./Navbar.scss";

import React, { CSSProperties } from "react";
import className from "~/utils/classNames";

interface INavbarProps {
    boxed?: boolean;
    className: string;
    opened?: boolean;
    mainHeight?: number | string;
    style?: CSSProperties;
    orientation?: "horizontal" | "vertical" | "horizontal-vertical";
    onCloseNavbar(): void;
}

const Navbar: React.FunctionComponent<INavbarProps> = props => {
    const navbarClasses = className({
        navbar: true,
        boxed: props.boxed,
        opened: props.opened,
        "horizontal-navbar": props.orientation === "horizontal",
        vertical: props.orientation === "vertical",
        "horizontal-vertical": props.orientation === "horizontal-vertical",
        [props.className]: !!props.className
    });

    const overlayClasses = className({
        overlay: true,
        opened: props.opened
    });

    const MIN_HEIGHT = props.mainHeight;

    const onOverlayClick = () => {
        props.onCloseNavbar();
    };

    return (
        <>
            <div className={navbarClasses} style={{ ...props.style, minHeight: MIN_HEIGHT }}>
                <div className="navbar-wrap">{props.children}</div>
            </div>
            <div className={overlayClasses} onClick={onOverlayClick} role="overlay" />
        </>
    );
};

Navbar.defaultProps = {
    boxed: false,
    opened: false,
    orientation: "horizontal"
};

export default Navbar;