import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { routerReducer } from "react-router-redux";

export const rootReducers = combineReducers(
    {
        routing: routerReducer
    }
);

export type RootState = StateType<typeof rootReducers>;
