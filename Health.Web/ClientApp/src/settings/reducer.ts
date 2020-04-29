import { IAppSettings } from "~/layouts/BaseLayout/IAppSettings";
import { defaultSettings } from "./defaultSettings";
import { SettingsActionTypes, SET_SETTINGS, UPDATE_SETTINGS, RESET_SETTINGS, TOGGLE_SIDEBAR } from "./types";

const initialState: IAppSettings = defaultSettings;
export const settingsReducer = (state: IAppSettings = initialState, action: SettingsActionTypes): IAppSettings => {
    switch (action.type) {
        case SET_SETTINGS:
            return { ...action.payload };
        case UPDATE_SETTINGS:
            return { ...state, ...action.payload };
        case RESET_SETTINGS:
            return { ...initialState };
        case TOGGLE_SIDEBAR:
            return { ...state, sidebarOpened: !state.sidebarOpened };
        default:
            return { ...state };
    }
};