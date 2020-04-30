import React from "react";
import { NavLink } from "reactstrap";
import { withPageConfig } from "~/components/Layout/withPageConfig";

export interface ISidebarTriggerProps {
    sidebarCollapsed: boolean;
    tag: any;
    children: JSX.Element;
    toggleSidebar?(): void;
}

export const defaultProps: ISidebarTriggerProps = {
    sidebarCollapsed: false,
    tag: NavLink,
    children:  <i className="fa fa-bars fa-fw"/>
};

const SidebarTrigger : React.FunctionComponent<ISidebarTriggerProps> = (props) => {
    const { tag: Tag, ...otherProps } = props;
    return (
        <Tag
            onClick={() => { props.toggleSidebar && props.toggleSidebar(); return false; }}
            active={Tag !== "a" ? !props.sidebarCollapsed : undefined}
            {...otherProps}
        >
            {props.children}
        </Tag>
    );
};

const cfgSidebarTrigger = withPageConfig(SidebarTrigger);

export {
    cfgSidebarTrigger as SidebarTrigger
};
