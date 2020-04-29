import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import posed from "react-pose";
import className from "~/utils/classNames";
import { IMenuItemSub } from "./IMenuItemSub";
import { IMenuItem } from "./IMenuItem";

const isHorizontal = (layout: string | undefined) => window.innerWidth >= 992 && layout === "horizontal";

const Sub = posed.div({
    closed: { height: 0, opacity: 0, overflow: "hidden" },
    open: { height: "auto", opacity: 1 },
    transition: { ease: "ease-in-out", duration: 250 }
});

const haveActive = (sub: IMenuItemSub[], location: Location): boolean => {
    const isActive = (item: IMenuItemSub) => item.routing === location.pathname.split("/")[2];
    return !!sub.find(isActive);
};

interface IWithSubProps extends IMenuItem {
    color?: string;
    contrast: string;
    accentColor?: string;
    accentContrast?: string;
}

const WithSub: React.FunctionComponent<IWithSubProps> = props => {
    const { icon, title, sub, color, accentColor, contrast } = props;

    const [opened, setOpened] = useState(false);

    useEffect(() => {
        setOpened(haveActive(sub ? sub : [], location));
    }, [location]);

    const layout = useRef(props.layout);

    const itemClasses = className({
        "menu-item": true,
        "has-sub": true,
        active: opened
    });

    const subItemClass = (routing: string) =>
        className({
            "menu-item": true,
            active: routing === location.pathname.split("/")[2]
        });

    const subLinkStyles: CSSProperties = {
        color: color
    };

    const activeSubLinkStyle: CSSProperties = {
        color: accentColor
    };

    const handleSubItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();

        setOpened(true);
    };

    const handleClick = () => {
        setOpened(!opened);
    };

    const itemSub = sub && sub.map((item, i) => (
        <li style={{ color }} className={subItemClass(`${item.routing}`)} key={i}>
            <NavLink
                to={`/${item.layout || layout.current}/${item.routing}`}
                className="item-link"
                activeClassName="active"
                style={subLinkStyles}
                activeStyle={activeSubLinkStyle}
                onClick={handleSubItemClick}
                replace={true}
            >
                <span className="link-text">{item.title}</span>
            </NavLink>
        </li>
    ));

    const itemIcon = icon && (
        <span
            className={`link-icon ${icon.class}`}
            style={{ backgroundColor: icon.bg, color: color || icon.color }}
        />
    );

    return (
        <>
            <li className={itemClasses} onClick={handleClick} role="menu">
                <span className="item-link">
                    {itemIcon}

                    <span className="link-text" style={{ color }}>
                        {title}
                    </span>

                    <span style={{ color }} className="link-caret icofont-rounded-right" />
                </span>

                {isHorizontal(layout.current) ? (
                    <ul
                        style={{ backgroundColor: contrast }}
                        className="sub"
                        onClick={e => e.stopPropagation()}
                    >
                        {itemSub}
                    </ul>
                ) : (
                        <Sub
                            style={{ transform: "translateY(5px)" }}
                            onClick={e => e.stopPropagation()}
                            pose={opened ? "open" : "closed"}
                        >
                            <ul className="sub">{itemSub}</ul>
                        </Sub>
                    )}
            </li>
        </>
    );
};

WithSub.defaultProps = {
    active: false
};

export default withRouter(WithSub);
