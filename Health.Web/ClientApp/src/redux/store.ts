import { createHashHistory } from "history";
import { combineReducers, createStore } from "redux";
import { connectRouter } from "connected-react-router";
import { settingsReducer } from "~/settings/reducer";
import { pageDataReducer } from "~/pages/reducer";

export const history = createHashHistory({
    hashType: "slash"
});

const rootReducer = combineReducers({
    settings: settingsReducer,
    pageData: pageDataReducer,
    router: connectRouter(history)
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = () => {
    return createStore(rootReducer);
};