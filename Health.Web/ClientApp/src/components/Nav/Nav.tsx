import React from "react";
import classNames from "classnames";
import { Nav as BsNav } from "reactstrap";
import PropTypes from "prop-types";

type BsNavProps = PropTypes.InferProps<typeof BsNav>;

export interface INavProps extends BsNavProps {
    accent?: boolean;
    navbar?: boolean;
    className?: string;
}

export const defaultProps: INavProps = {
    accent: false
};

const Nav: React.FunctionComponent<INavProps> = ({ accent, className, ...otherProps }) => {
    return (
        <BsNav
            className={
                classNames(className, "nav", { "nav-accent": accent })
            }
            {...otherProps}
        />
    );
};

export { Nav };
