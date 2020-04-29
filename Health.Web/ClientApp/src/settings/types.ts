import { IAppSettings } from "~/layouts/BaseLayout/IAppSettings";

export const SET_SETTINGS = "[Settings] Set Settings";
export const RESET_SETTINGS = "[Settings] Reset Settings";
export const UPDATE_SETTINGS = "[Settings] Update Settings";
export const TOGGLE_SIDEBAR = "[User] Toggle Sidebar";

export interface ISetSettingsAction {
  type: typeof SET_SETTINGS;
  payload: IAppSettings;
}

export interface IResetSettingsAction {
  type: typeof RESET_SETTINGS;
}

export interface IUpdateSettingsAction {
  type: typeof UPDATE_SETTINGS;
  payload: IAppSettings;
}

export interface IToggleSidebarAction {
    type: typeof TOGGLE_SIDEBAR;
}

export type SettingsActionTypes = ISetSettingsAction | IResetSettingsAction | IUpdateSettingsAction | IToggleSidebarAction;