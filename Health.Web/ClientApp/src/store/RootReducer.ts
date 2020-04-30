import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { weatherReducer } from "~/scenarios/Weather/api/WeatherReducer";
import { createHashHistory } from "history";
import { connectRouter } from "connected-react-router";

export const history = createHashHistory({
    hashType: "slash"
  });

export const rootReducers = combineReducers(
    {
        weather: weatherReducer,
        router: connectRouter(history)
    }
);

export type RootState = StateType<typeof rootReducers>;
