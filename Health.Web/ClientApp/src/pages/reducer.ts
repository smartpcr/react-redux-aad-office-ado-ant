import { IPageData } from "~/layouts/BaseLayout/IPageData";
import { PageActionsTypes, SET_PAGE_DATA, UPDATE_PAGE_DATA, RESET_PAGE_DATA } from "./types";

const initialState: IPageData = {
    title: "",
    loaded: true,
    breadcrumbs: undefined,
    fullFilled: false
};

export const pageDataReducer = (state: IPageData = initialState, action: PageActionsTypes): IPageData => {
    switch (action.type) {
        case SET_PAGE_DATA:
            return { ...action.payload };
        case UPDATE_PAGE_DATA:
            return { ...state, ...action.payload };
        case RESET_PAGE_DATA:
            return { ...initialState };
        default:
            return { ...state };
    }
};