import { IPageData } from "~/layouts/BaseLayout/IPageData";

export const SET_PAGE_DATA = "[Base Page] Set";
export const RESET_PAGE_DATA = "[Base PAge] Reset";
export const UPDATE_PAGE_DATA = "[Base Page] Update";

export interface ISetPageDataAction {
  type: typeof SET_PAGE_DATA;
  payload: IPageData;
}

export interface IResetPageDataAction {
  type: typeof RESET_PAGE_DATA;
}

export interface IUpdatePageDataAction {
  type: typeof UPDATE_PAGE_DATA;
  payload: IPageData;
}

export type PageActionsTypes = ISetPageDataAction | IResetPageDataAction | IUpdatePageDataAction;
