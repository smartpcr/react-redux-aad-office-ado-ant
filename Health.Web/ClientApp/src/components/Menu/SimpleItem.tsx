import React, { CSSProperties } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { IMenuItem } from "./IMenuItem";
import className from "~/utils/classNames";

interface ISimpleItemProps extends IMenuItem {
    color?: string;
    accentColor?: string;
    accentContrast?: string;
}

const SimpleItem: React.FunctionComponent<ISimpleItemProps | any> = props => {
    const { icon, title, routing, layout, location, color, accentColor, accentContrast } = props;

    const itemClasses = className({
        "menu-item": true,
        active: location.pathname === `/${layout}/${routing}`
    });

    const style: CSSProperties = {
        color: color
    };

    const activeStyle: CSSProperties = {
        color: accentContrast,
        backgroundColor: accentColor
    };

    return (
        <li className={itemClasses}>
            <NavLink
                to={`/${layout}/${routing}`}
                className="item-link"
                style={style}
                activeStyle={activeStyle}
                activeClassName="active"
                replace={true}
            >
                <span
                    className={`link-icon ${icon.class}`}
                    style={{ backgroundColor: icon.bg, color: icon.color }}
                />
                <span className="link-text">{title}</span>
            </NavLink>
        </li>
    );
};

export default withRouter(SimpleItem);
