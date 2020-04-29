import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { IPageData } from "~/layouts/BaseLayout/IPageData";
import { Dispatch } from "redux";
import { updatePageDada, setPageData } from "~/pages/actions";

interface BasePageProps {
    onSetPage(data: IPageData): void;
    onPageUpdate(data: IPageData): void;
}

const BasePage: React.FunctionComponent<BasePageProps> = props => {
    const { onPageUpdate, onSetPage } = props;

    const getPageData = async (url: string) => {
        const result = await axios.get(url);
        onPageUpdate({ loaded: true, fullFilled: true });
        return result.data;
    };

    const setPageData = (data: IPageData) => {
        const pageData = { ...data, fullFilled: true };
        onSetPage(pageData);

        return () => {
            const offPageData: IPageData = {
                loaded: false
            };
            onSetPage(offPageData);
        };
    };

    const pageComponent = React.Children.map(props.children as React.ReactElement<any>, child =>
        React.cloneElement(child, { onSetPage: setPageData, getPageData })
    );

    return <>{pageComponent}</>;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onPageUpdate: (data: IPageData) => dispatch(updatePageDada(data)),
    onSetPage: (data: IPageData) => dispatch(setPageData(data))
});

export default connect(
    null,
    mapDispatchToProps
)(BasePage);
