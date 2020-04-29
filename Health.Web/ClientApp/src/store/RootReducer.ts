import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { routerReducer } from "react-router-redux";
import { weatherReducer } from "~/scenarios/Weather/api/WeatherReducer";

export const rootReducers = combineReducers(
    {
        routing: routerReducer,
        weather: weatherReducer
    }
);

export type RootState = StateType<typeof rootReducers>;
