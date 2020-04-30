import React from "react";
import classNames from "classnames";

export interface IIconWithBadgeProps {
    badge?: any;
    children?: any;
    className?: string;
}

const IconWithBadge: React.FunctionComponent<IIconWithBadgeProps> = (props) => {
    const { badge, children, className } = props;
    const adjustedBadge = React.cloneElement(badge, {
        className: classNames(
            badge.props.className,
            "icon-with-badge__badge"
        )
    });
    const wrapClass = classNames(className, "icon-with-badge");
    return (
        <div className={wrapClass}>
            {children}
            {adjustedBadge}
        </div>
    );
};

export { IconWithBadge };
