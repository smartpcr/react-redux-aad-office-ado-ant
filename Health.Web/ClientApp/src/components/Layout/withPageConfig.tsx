import React from "react";
import { PageConfigContext } from "./PageConfigContext";

export const withPageConfig = (Component: any) => {
    const pageConfig = (props: any) => (
        <PageConfigContext.Consumer>
        {
            (pageConfigProps) => <Component pageConfig={pageConfigProps} {...props} />
        }
        </PageConfigContext.Consumer>
    );
    return pageConfig;
};
