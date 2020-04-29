import { WeatherDataStore, initialHeaderData } from "./WeatherDataStore";
import * as actions from "./WeatherActions";
import { ActionType } from "typesafe-actions";
import { WeatherActionTypes } from "./WeatherActionTypes";

export type Actions = ActionType<typeof actions>;

export function weatherReducer(state: WeatherDataStore = initialHeaderData, action: Actions): WeatherDataStore {
    switch (action.type) {
        case WeatherActionTypes.GET_WEATHER_SUCCESS:
            return { ...state, weathers: action.payload };
        case WeatherActionTypes.GET_WEATHER_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}