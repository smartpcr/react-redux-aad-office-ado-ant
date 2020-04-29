import * as PageTypes from "./types";
import { IPageData } from "~/layouts/BaseLayout/IPageData";

export const setPageData = (data: IPageData): PageTypes.ISetPageDataAction => ({
  type: PageTypes.SET_PAGE_DATA,
  payload: data
});

export const updatePageDada = (data: IPageData): PageTypes.IUpdatePageDataAction => ({
  type: PageTypes.UPDATE_PAGE_DATA,
  payload: data
});

export const resetPageData = (): PageTypes.IResetPageDataAction => ({
  type: PageTypes.RESET_PAGE_DATA
});
