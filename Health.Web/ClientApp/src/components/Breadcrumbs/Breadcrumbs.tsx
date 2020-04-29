import "./Breadcrumbs.scss";

import React from "react";
import { IBreadcrumb } from "~/layouts/BaseLayout/IPageData";
import { NavLink } from "react-router-dom";

interface IBreadcrumbsProps {
    breadcrumbs: IBreadcrumb[];
}

const Breadcrumbs: React.FunctionComponent<IBreadcrumbsProps> = props => {
    return (
        <ul className="breadcrumbs">
            {props.breadcrumbs.map((breadcrumb, i) =>
                <li className="item" key={i}>
                    {breadcrumb.route && <NavLink className="breadcrumb-link" to={breadcrumb.route}>{breadcrumb.title}</NavLink>}
                    {!breadcrumb.route && <span className="breadcrumb-link last">{breadcrumb.title}</span>}
                    {i < props.breadcrumbs.length - 1 && <span className="separator">|</span>}
                </li>
            )}
        </ul>
    );
};

export default Breadcrumbs;